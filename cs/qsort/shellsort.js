class BaseSort {
  exchange (a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  less (v, w) {
    return v < w
  }
}

class ShellSort extends BaseSort {
  sort (a) {
    const N = a.length
    let h = 1
    while (h < N / 3) h = 3 * h + 1
    while (h >= 1) {
      for (let i = h; i < N; i++) {
        for (let j = i; j >= h && this.less(a[j], a[j - h]); j -= h) {
          this.exchange(a, j, j - h)
        }
      }
      h = Math.floor(h / 3)
    }
    return a
  }
}

const s = new ShellSort()
const ret = s.sort('SHELLSORTEXAMPLE'.split(''))
console.log(ret.join(''))
