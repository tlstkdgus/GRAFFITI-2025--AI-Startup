/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 기존 테마 색상들을 여기에 추가
        'base-color-1': '#ffffff',
        'base-color-2': '#333333', // 실제 색상으로 변경
        'point-color': '#3366E5',
        'border-color': '#E6E6E6',
        'accent': '#3b82f6',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        sans: [
          "Pretendard Variable", 
          "Pretendard", 
          "-apple-system", 
          "BlinkMacSystemFont", 
          "system-ui", 
          "Roboto", 
          "Helvetica Neue", 
          "Segoe UI", 
          "Apple SD Gothic Neo", 
          "Noto Sans KR", 
          "Malgun Gothic", 
          "sans-serif"
        ],
      },
      screens: {
        'xs': {'max' : '430px'},
      }
    },
  },
  plugins: [],
}