var
  compile = require('..'),
  assert = require('assert'),
  srcObj, srcObj2, obj;

// source object to be compiled
srcObj = {
  '@_imports': '<%= d.d1 %>',
  d: {
    d1: {
      d11: 'd11'
    }
  },
  a: {
    sk: 'a.sk',
    ak: ['one', null, 'three', 123],
    ok: {
      sk: 'a.ok.sk',
      nk: 123
    }
  },
  b: {
    a_ref: '<%=a%>',
    sk: '<%=a.sk %>',
    ak: '<%= a.ak%>',
    ak_0: 'one-<%=    a.ak.0     %>',
    ak_1: '<%= a.ak.1 %>',
    ak_2: '<%= a.ak.2 %>',
    ok: '<%= a.ok %>',
    nullk: '<%= a.nullk %>',
    missing: '<%= a.missing %>',
    dynamic: 'this is <%= .dynamic_arg %> and static text'
  },
  b_ref: '<%= b %>',
  c: {
    '@_imports': '<%= b_ref %>',
    dynamic_arg: 'dynamically replaced',
    a: { sk: 'c.a.sk'},
    relative_sk: '<%= .a.sk %>'
  }
};

srcObj2 = { a: 'a', b: '<%= a %>'};

assert.equal(typeof compile, 'function', 'module should export single function');

// compile simple object without imports at root level
assert.strictEqual(compile(srcObj2), srcObj2, 'result object should be a reference source object');
assert.strictEqual(srcObj2.b, srcObj2.a, 'value should be replaced');

// compile object and save result (actually source object is returned)
obj = compile(srcObj);
assert.notStrictEqual(obj, srcObj, 'result object should NOT be a reference source object');

assert.strictEqual(obj.b.nullk, '<%= a.nullk %>', 'null value is not replaced');
assert.strictEqual(obj.b.missing, '<%= a.missing %>', 'failed selector is not replaced');
assert.strictEqual(obj.b.a_ref, obj.a, 'value should be replaced');
assert.strictEqual(obj.b.sk, obj.a.sk, 'value should be replaced');
assert.strictEqual(obj.b.ak, obj.a.ak, 'value should be replaced');
assert.strictEqual(obj.b.ak_0, 'one-' + obj.a.ak[0], 'value should be replaced');
assert.strictEqual(obj.b.ak_1, '<%= a.ak.1 %>', 'null value is not replaced');
assert.strictEqual(obj.b.ak_2, obj.a.ak[2], 'value should be replaced');
assert.strictEqual(obj.b.ok, obj.a.ok, 'value should be replaced');
assert.strictEqual(obj.b_ref, obj.b, 'value should be replaced');
assert.strictEqual(obj.c.relative_sk, obj.c.a.sk, 'relative value should be accessible');
assert.strictEqual(obj.d11, obj.d.d1.d11, 'imported value should be accessible');
assert.strictEqual(obj.c.sk, obj.b.sk, 'imported value should be accessible');
assert.strictEqual(obj.c.dynamic, 'this is dynamically replaced and static text',
  'imported dynamic value should be accessible');
