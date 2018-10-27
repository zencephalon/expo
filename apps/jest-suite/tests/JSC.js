export const name = 'JSC';

export function describe() {
  it(`defines the Symbol global variable and symbol primitive type`, () => {
    expect(Symbol).toBeDefined();

    let test = Symbol('test');
    expect(typeof test).toBe('symbol');
  });

  it(`supports typed arrays`, () => {
    let buffer = new ArrayBuffer(4);
    let byteView = new Uint8Array(buffer);
    let dataView = new DataView(buffer);

    byteView[0] = 0xde;
    byteView[1] = 0xad;
    byteView[2] = 0xca;
    byteView[3] = 0xfe;

    expect(dataView.getUint32(0).toString(16)).toBe('deadcafe');
  });

  it(`supports proxies`, () => {
    let target = { hello: 'world' };
    let proxy = new Proxy(target, {
      get(receiver, name) {
        return name in receiver ? receiver[name] : `${name}!`;
      },
    });
    expect(proxy.hello).toBe('world');
    expect(proxy.goodbye).toBe('goodbye!');
  });

  when({ platform: 'android' }).it(`doesn't use the internationalization-enabled variant`, () => {
    let date = new Date(2000, 0, 1);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let hebrewDate = date.toLocaleDateString('he', options);
    let usDate = date.toLocaleDateString('en-US', options);
    expect(hebrewDate).toBe(usDate);
  });

  when({ platform: platform => platform !== 'android' }).it(
    `uses the internationalization-enabled variant`,
    () => {
      let date = new Date(2000, 0, 1);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let hebrewDate = date.toLocaleDateString('he', options);
      let usDate = date.toLocaleDateString('en-US', options);
      expect(hebrewDate).not.toBe(usDate);
    }
  );
}
