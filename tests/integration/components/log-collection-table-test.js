import { module, test } from 'qunit';
import { setupRenderingTest } from 'log-collection/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | log-collection-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LogCollectionTable />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <LogCollectionTable>
        template block text
      </LogCollectionTable>
    `);

    assert.dom().hasText('template block text');
  });
});
