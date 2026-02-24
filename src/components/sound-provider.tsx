"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface SoundContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType>({
  enabled: true,
  setEnabled: () => {},
});

export const useSoundSettings = () => useContext(SoundContext);

// Lazy audio context singleton
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
  }
  return audioContext;
};

// Prasen.dev-style click sound using Web Audio API oscillator
const playClickSound = (ctx: AudioContext, volume: number) => {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    600,
    ctx.currentTime + 0.05,
  );

  gainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  oscillator.type = "sine";
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.08);
};

const playSound = (volume: number = 0.3) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  try {
    playClickSound(ctx, volume);
  } catch {
    // Silently fail if audio doesn't work
  }
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("sound-enabled");
    return saved !== null ? saved === "true" : true;
  });
  const mountedRef = useRef(false);

  // Mark as mounted after first render
  useEffect(() => {
    mountedRef.current = true;
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem("sound-enabled", String(enabled));
    }
  }, [enabled]);

  // Unlock audio context on first interaction
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
    };

    const events = ["click", "touchstart", "keydown"] as const;
    events.forEach((event) => {
      document.addEventListener(event, unlockAudio, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, unlockAudio);
      });
    };
  }, []);

  // Global click sound handler
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isButton = target.closest("button");
      const isLink = target.closest("a");
      const isCard = target.closest("[role='button']");
      const isNavItem = target.closest("nav a, nav button");

      if (isButton || isLink || isCard || isNavItem) {
        playSound(0.3);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [enabled]);

  // Global keyboard sound handler (Enter key)
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const target = e.target as HTMLElement;
        const isButton = target.closest("button");
        const isLink = target.closest("a");
        const isCard = target.closest("[role='button']");

        if (isButton || isLink || isCard) {
          playSound(0.3);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);

  const handleSetEnabled = useCallback((value: boolean) => {
    setEnabled(value);
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, setEnabled: handleSetEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}
