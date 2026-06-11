"use client";

import { useEffect, useRef, useState } from "react";

// Energetic lo-fi focus beats, generated live with the Web Audio API.
// No audio files, no copyright worries — the browser synthesizes a
// warm chord pad, a head-nodding drum groove (kick / snare / hats),
// a bassline, and melodic plucks. ~88 BPM: energizing, not distracting.
//
// Audio can only start after a user gesture (browser autoplay rules),
// which is why everything begins inside the button's click handler.

// Four mellow seventh chords (frequencies in Hz): Cmaj7, Am7, Fmaj7, G7.
const CHORDS: number[][] = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 261.63, 329.63, 392.0],
  [174.61, 220.0, 261.63, 329.63],
  [196.0, 246.94, 293.66, 349.23],
];

const BPM = 88;
const STEP_MS = (60_000 / BPM) / 2; // one 8th note (~340ms)
const STEPS_PER_BAR = 8;
const BARS_PER_CHORD = 2; // chord changes every 16 steps

// Two-bar groove patterns (which 8th-note steps each drum hits).
const KICK_STEPS = [0, 6, 10];
const SNARE_STEPS = [4, 12];
const PLUCK_STEPS = [2, 5, 9, 14];

export default function FocusMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const stepRef = useRef(0);
  const chordRef = useRef(0);

  // --- Instruments -------------------------------------------------

  // Warm pad: the chord swells under everything for two bars.
  function pad(ctx: AudioContext, out: AudioNode, notes: number[]) {
    const len = (STEP_MS / 1000) * STEPS_PER_BAR * BARS_PER_CHORD;
    const t = ctx.currentTime;
    for (const freq of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq / 2; // octave down = warmer
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.035, t + 0.8);
      gain.gain.setValueAtTime(0.035, t + len - 0.8);
      gain.gain.linearRampToValueAtTime(0, t + len);
      osc.connect(gain).connect(out);
      osc.start(t);
      osc.stop(t + len);
    }
  }

  // Kick: a sine that drops fast from 120Hz to 45Hz. Boom.
  function kick(ctx: AudioContext, out: AudioNode) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.connect(gain).connect(out);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Snare / hat: short bursts of filtered noise.
  function noiseHit(
    ctx: AudioContext,
    out: AudioNode,
    freq: number,
    decay: number,
    volume: number,
  ) {
    if (!noiseRef.current) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseRef.current;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = freq;
    const gain = ctx.createGain();
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + decay);
    src.connect(filter).connect(gain).connect(out);
    src.start(t);
    src.stop(t + decay);
  }

  // Bass: the chord's root note, two octaves down, riding the kick.
  function bass(ctx: AudioContext, out: AudioNode) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime;
    osc.type = "triangle";
    osc.frequency.value = CHORDS[chordRef.current][0] / 4;
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain).connect(out);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Pluck: a bright chord tone for melody sparkle.
  function pluck(ctx: AudioContext, out: AudioNode) {
    const chord = CHORDS[chordRef.current];
    const freq = chord[Math.floor(Math.random() * chord.length)] * 2;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain).connect(out);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  // --- Sequencer ---------------------------------------------------

  function start() {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // One second of white noise, reused for every snare/hat hit.
    const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noiseRef.current = buf;

    // Low-pass filter on the master bus = the cozy lo-fi glaze.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 3500;
    const master = ctx.createGain();
    master.gain.value = 0.8;
    filter.connect(master).connect(ctx.destination);

    stepRef.current = 0;
    chordRef.current = 0;
    pad(ctx, filter, CHORDS[0]);

    // The drum machine: one tick per 8th note.
    timersRef.current.push(
      setInterval(() => {
        const step = stepRef.current % (STEPS_PER_BAR * BARS_PER_CHORD);

        if (step === 0 && stepRef.current > 0) {
          chordRef.current = (chordRef.current + 1) % CHORDS.length;
          pad(ctx, filter, CHORDS[chordRef.current]);
        }
        if (KICK_STEPS.includes(step)) {
          kick(ctx, filter);
          bass(ctx, filter);
        }
        if (SNARE_STEPS.includes(step)) noiseHit(ctx, filter, 1800, 0.12, 0.18);
        if (step % 2 === 1) noiseHit(ctx, filter, 7000, 0.05, 0.08); // off-beat hats
        if (PLUCK_STEPS.includes(step)) pluck(ctx, filter);

        stepRef.current++;
      }, STEP_MS),
    );
    setPlaying(true);
  }

  function stop() {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];
    ctxRef.current?.close();
    ctxRef.current = null;
    setPlaying(false);
  }

  // Clean up if the component ever unmounts while playing.
  useEffect(() => () => stop(), []);

  return (
    <button
      onClick={playing ? stop : start}
      aria-pressed={playing}
      title={playing ? "Stop focus beats" : "Play focus beats"}
      className={`rounded-full px-3 py-1.5 text-xs mono transition-colors ${
        playing
          ? "bg-violet-400/20 text-violet-200 border border-violet-400/40"
          : "text-[color:var(--muted)] hover:bg-white/5 hover:text-violet-200"
      }`}
    >
      {playing ? "🎧 Beats On" : "🎧 Focus Beats"}
    </button>
  );
}
