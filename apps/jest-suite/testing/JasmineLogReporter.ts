import * as Testing from './Testing';

const TEST_SUITE_END_SENTINEL = '[TEST-SUITE-END]';

export default class JasmineLogReporter {
  _timings = {};
  _summaryLines = [];
  _failureLines = [];
  _failedSpecCount = 0;

  jasmineStarted() {
    console.log(`🔰 Tests started`);
  }

  jasmineDone(doneInfo) {
    console.log(`🎉 Tests finished`);
    if (doneInfo.overallStatus === 'passed') {
      console.log(`✅ All tests passed!`);
    } else if (doneInfo.overallStatus === 'incomplete') {
      console.log(`⚠️ Tests incomplete: ${doneInfo.incompleteReason}`);
    } else {
      console.log(`❌ Tests failed`);
    }

    // Communicate that the tests finished
    Testing.completed({
      status: doneInfo.overallStatus,
      failed: this._failedSpecCount,
      failures: this._failureLines.join('\n'),
    });

    // The test runner waits for a sentinel value in the output
    console.log({
      magic: TEST_SUITE_END_SENTINEL,
      status: doneInfo.overallStatus,
      failed: this._failedSpecCount,
      results: this._summaryLines.join('\n'),
    });
  }

  suiteStarted(suiteResult) {
    console.group(suiteResult.description);
    this._timings[suiteResult.id] = -Date.now();
  }

  suiteDone(suiteResult) {
    this._timings[suiteResult.id] += Date.now();
    let timing = _formatSpecTiming(this._timings[suiteResult.id]);
    console.log(`JSC tests finished (${timing})`);
    console.groupEnd();
  }

  specStarted(specResult) {
    this._timings[specResult.id] = -Date.now();
  }

  specDone(specResult) {
    this._timings[specResult.id] += Date.now();
    let timing = _formatSpecTiming(this._timings[specResult.id]);

    if (specResult.status === 'passed') {
      console.log(`✓ ${specResult.description} (${timing})`);
      this._logResultMessage(`PASS ${specResult.fullName} (${timing})`);
    } else if (specResult.status === 'failed') {
      this._failedSpecCount++;

      console.group(`✗ ${specResult.description}`);
      this._logResultMessage(`FAIL ${specResult.fullName} (${timing})`);
      this._failureLines.push(`FAIL ${specResult.fullName} (${timing})`);

      for (let expectation of specResult.failedExpectations) {
        console.log(expectation.message);
        this._logResultMessage(`  ${expectation.message}`);
        this._failureLines.push(`  ${expectation.message}`);
      }

      console.groupEnd();
    }
  }

  _logResultMessage(message) {
    Testing.log(message);
    this._summaryLines.push(message);
  }
}

function _formatSpecTiming(msElapsed) {
  if (msElapsed < 1000) {
    return `${msElapsed} ms`;
  }

  let seconds = Math.floor(msElapsed / 1000);
  let millis = msElapsed % 1000;
  return `${seconds}.${Math.round(millis / 10)}s`;
}
