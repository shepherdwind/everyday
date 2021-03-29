
export function run(actions: string[], args: any[], clsBase: any) {
  const cls = actions.shift();
  const arg = args.shift();
  const base = new clsBase[cls](...arg);
  const ret = [null];
  actions.forEach((action, index) => {
    ret.push(base[action](...args[index]));
  });
  console.log(ret);
  return ret;
}