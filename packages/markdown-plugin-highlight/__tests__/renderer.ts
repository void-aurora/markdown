import { render } from '../src/prism';

describe('renderer', () => {
  test('default', () => {
    expect(render('# Title', 'markdown')).toEqual(
      '<span class="token title important"><span class="token punctuation">#</span> Title</span>',
    );
  });

  test('non-supported language', () => {
    expect(render('non-support source code', 'foobar')).toEqual('');
  });

  test('blacklist', () => {
    expect(render('foobar source code', 'extend'));
  });
});
