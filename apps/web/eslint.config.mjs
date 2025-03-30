// @ts-check
/// <reference types="node" />
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'dist/**/*',
      '.angular/**/*',
      'coverage/**/*',
      'tmp/**/*',
      'out-tsc/**/*'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url))
      }
    },
    plugins: {
      '@typescript-eslint': ts,
      '@angular-eslint': angular
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      ...ts.configs['recommended'].rules,
      ...ts.configs['recommended-requiring-type-checking'].rules,
      ...angular.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': 'warn'
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    rules: {
      ...angularTemplate.configs['recommended'].rules,
      'prettier/prettier': 'warn'
    }
  },
  {
    files: ['**/*.css', '**/*.scss'],
    rules: {
      'prettier/prettier': 'warn'
    }
  }
];
