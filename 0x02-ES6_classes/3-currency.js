export default class Currency {
  constructor(code, name) {
    this._code = code;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(nme) {
    this._name = nme;
  }

  get code() {
    return this._code;
  }

  set code(cod) {
    this._name = cod;
  }

  displayFullCurrency() {
    return `${this.name} (${this.code})`;
  }
}
