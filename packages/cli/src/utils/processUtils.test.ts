/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';
import {
  RELAUNCH_EXIT_CODE,
  RELAUNCH_WITH_RESUME_EXIT_CODE,
  relaunchApp,
} from './processUtils.js';
import * as cleanup from './cleanup.js';

describe('processUtils', () => {
  const processExit = vi
    .spyOn(process, 'exit')
    .mockReturnValue(undefined as never);
  const runExitCleanup = vi.spyOn(cleanup, 'runExitCleanup');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should run cleanup and exit with the relaunch code', async () => {
    await relaunchApp();
    expect(runExitCleanup).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenCalledWith(RELAUNCH_EXIT_CODE);
  });

  it('should exit with resume code when withResume is true', async () => {
    await relaunchApp({ withResume: true });
    expect(runExitCleanup).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenCalledWith(RELAUNCH_WITH_RESUME_EXIT_CODE);
  });
});
