/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        n8n: {
          bg: '#0B0F19',
          surface: '#111827',
          card: '#182234',
          border: '#243247',
          hover: '#2D3D56',
          coral: '#EA4B3C',
          orange: '#FF6D5A',
          blue: '#3B82F6',
          green: '#10B981',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          pink: '#EC4899',
          cyan: '#06B6D4'
        },
        archival: {
          bg: 'var(--bg)',
          panel: 'var(--panel)',
          panel2: 'var(--panel2)',
          ink: 'var(--ink)',
          ink2: 'var(--ink2)',
          ink3: 'var(--ink3)',
          line: 'var(--line)',
          lineSubtle: 'var(--line-subtle)',
          accent: 'var(--accent)',
          accentSoft: 'var(--accent-soft)'
        }
      },
      fontFamily: {
        mono: ['"DM Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"DM Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
        display: ['"DM Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
