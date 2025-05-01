// eslint.config.js
import path from 'path'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import parserTypeScript from '@typescript-eslint/parser'
import pluginAngular from '@angular-eslint/eslint-plugin'
import parserAngularTemplate from '@angular-eslint/template-parser'
import pluginAngularTemplate from '@angular-eslint/eslint-plugin-template' // Nuevo import

export default [
  // Configuración base
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
  {
    plugins: { prettier: pluginPrettier },
    rules: { ...pluginPrettier.configs.recommended.rules },
  },

  // Configuración para NestJS (API)
  {
    files: ['apps/api/**/*.{js,ts}'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        project: path.resolve(process.cwd(), 'apps/api/tsconfig.json'),
        tsconfigRootDir: path.resolve(process.cwd(), 'apps/api'),
      },
    },
    plugins: { '@typescript-eslint': pluginTypeScript },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      'prettier/prettier': 'error',
    },
  },

  // Configuración para Angular (Web) - TypeScript
  {
    files: ['apps/web/**/*.ts'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        project: path.resolve(process.cwd(), 'apps/web/tsconfig.json'),
        tsconfigRootDir: path.resolve(process.cwd(), 'apps/web'),
      },
    },
    plugins: { '@angular-eslint': pluginAngular, prettier: pluginPrettier },
    rules: {
      '@angular-eslint/directive-selector': [
        'warn',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'warn',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      'prettier/prettier': ['error', { parser: 'typescript' }],
    },
  },

  // Configuración para Angular (Web) - HTML
  {
    files: ['apps/web/**/*.html'],
    languageOptions: {
      parser: parserAngularTemplate,
    },
    plugins: {
      '@angular-eslint/template': pluginAngularTemplate, // Usa el plugin correcto
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }],
      // Actualiza los nombres de las reglas
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'warn',
    },
  },
]
