/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { runExitCleanup } from './cleanup.js';

/**
 * Exit code used to signal that the CLI should be relaunched.
 */
export const RELAUNCH_EXIT_CODE = 199;

/**
 * Exit code used to signal that the CLI should be relaunched and resume the previous session.
 */
export const RELAUNCH_WITH_RESUME_EXIT_CODE = 198;

/**
 * Exits the process with a special code to signal that the parent process should relaunch it.
 */
export async function relaunchApp(options?: {
  withResume?: boolean;
}): Promise<void> {
  await runExitCleanup();
  process.exit(
    options?.withResume ? RELAUNCH_WITH_RESUME_EXIT_CODE : RELAUNCH_EXIT_CODE,
  );
}
