import { normalizeLang } from '../src/normalize';

describe('normalize', () => {
  test('default', () => {
    expect(normalizeLang('javascript foobar')).toEqual('javascript');
    expect(normalizeLang('Fake')).toEqual('fake');
    expect(normalizeLang('C++')).toEqual('cpp');
    expect(normalizeLang('C#')).toEqual('csharp');
  });
});
