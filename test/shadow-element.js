// Copyright 2013 The Toolkitchen Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

suite('HTMLShadowElement', function() {

  test('olderShadowRoot', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a>a</a><b>b</b>';
    var a = host.firstChild;
    var b = host.lastChild;

    var sr = host.createShadowRoot();
    sr.innerHTML = 'a<shadow>b</shadow>c';
    var shadow = sr.firstElementChild;

    renderAllPending();
    assert.isTrue(shadow instanceof WrapperHTMLShadowElement);
    assert.isNull(shadow.olderShadowRoot);

    var sr2 = host.createShadowRoot();
    sr2.innerHTML = 'd<shadow>e</shadow>f';
    var shadow2 = sr2.firstElementChild;

    renderAllPending();
    assert.isTrue(shadow instanceof WrapperHTMLShadowElement);
    assert.isNull(shadow.olderShadowRoot);

    assert.isTrue(shadow2 instanceof WrapperHTMLShadowElement);
    assert.equal(shadow2.olderShadowRoot, sr);

    assert.equal(unwrap(host).innerHTML, 'dabcf');
  });
});
