"use client";

import { useEffect, useRef, useState } from "react";

// Lo-fi ambient focus music, generated live with the Web Audio API.
// No audio files, no copyright worries — the browser synthesizes a
// slow four-chord pad with gentle plucked notes on top.
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

const CHORD_SECONDS = 8; // each chord pad lasts this long
const PLUCK_SECONDS = 1.6; // a soft pluck this often

export default function FocusMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const chordIndexRef = useRef(0);

  // One soft, slowly-swelling chord pad.
  function playChordPad(ctx: AudioContext, master: GainNode, notes: number[]) {
    for (const freq of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq / 2; // an octave down = warmer
      // Swell in, hold, fade out — like a synth pad.
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 2.5);
      gain.gain.setValueAtTime(0.05, t + CHORD_SECONDS - 2.5);
      gain.gain.linearRampToValueAtTime(0, t + CHORD_SECONDS);
      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + CHORD_SECONDS);
    }
  }

  // One short plucked note from the current chord, up an octave.
  function playPluck(ctx: AudioContext, master: GainNode) {
    const chord = CHORDS[chordIndexRef.current];
    const freq = chord[Math.floor(Math.random() * chord.length)] * 2;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + 1.2);
  }

  function start() {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master volume + a low-pass filter for that muffled lo-fi feel.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    const master = ctx.createGain();
    master.gain.value = 0.9;
    filter.connect(master).connect(ctx.destination);

    // First chord right away, then rotate every CHORD_SECONDS.
    playChordPad(ctx, filter, CHORDS[0]);
    chordIndexRef.current = 0;
    timersRef.current.push(
      setInterval(() => {
        chordIndexRef.current = (chordIndexRef.current + 1) % CHORDS.length;
        playChordPad(ctx, filter, CHORDS[chordIndexRef.current]);
      }, CHORD_SECONDS * 1000),
      setInterval(() => playPluck(ctx, filter), PLUCK_SECONDS * 1000),
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
      title={playing ? "Stop focus music" : "Play focus music"}
      className={`rounded-full px-3 py-1.5 text-xs mono transition-colors ${
        playing
          ? "bg-violet-400/20 text-violet-200 border border-violet-400/40"
          : "text-[color:var(--muted)] hover:bg-white/5 hover:text-violet-200"
      }`}
    >
      {playing ? "🎵 Music On" : "🎵 Focus Music"}
    </button>
  );
}
