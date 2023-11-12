import '@testing-library/jest-dom';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { render } from '@testing-library/react';

import App from '../App';

vitest.mock('../firebase', async () => {
  const testEnv = await initializeTestEnvironment({
    projectId: 'test',
  });

  await testEnv.withSecurityRulesDisabled(async (context) => {
    const firestore = context.firestore();

    await Promise.all([
      firestore.doc('sample/a').set({
        text: 'sample-text-a',
      }),
    ]);
  });

  const db = testEnv.authenticatedContext('test').firestore();

  return { db };
});

describe('test', () => {
  test('test', async () => {
    const { findByText } = render(<App />);

    expect(await findByText('[{"text":"sample-text-a"}]')).toBeInTheDocument();
  });
});
