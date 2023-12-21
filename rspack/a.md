# rspack 实现分析

## 如何实现 webpack 兼容

### @rspack/bin

命令行入口代码，主要初始化配置项，读取本地文件初始化配置。然后调用 createCompiler 方法，
获得 compiler 实例，执行 build 等任务。

### @rspack/core

#### rspack.ts

- createCompiler
```typescript
const options = getNormalizedRspackOptions(userOptions);
  // context 是文件夹根目录
	const compiler = new Compiler(options.context, options);

  // 从 options 中初始化所有的 plugin
  if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				(plugin as RspackPluginFunction).call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
```

createCompiler 方法调用 RspackOptionsApply

- RspackOptionsApply process 方法会初始化一些类似的 plugin，主要是
  - ResolveSwcPlugin
  - DefaultStatsPrinterPlugin
  - DefaultStatsPrinterPlugin


#### Compiler

Compiler 中有一个 webpack 属性，用于兼容 webpack 插件。这个对象和 webpack 保持一致，这样，webpack
老的插件都可以直接执行了。在 webpack 中插件，主要执行一个 apply 方法，这个方法如此是 compiler 对象，
通过这个对象，可以观测 hook ，也可以发布 hook 事件。

- constructor 主要初始化 hooks ，实现 webpack 所有 plugin 依赖的 hook
- #getInstance 获得 rust rspack 实例

主要过程
```typescript
  // 这里会默认合并一些系统内置的 plugin
  optionsApply_compat(this, options);
// 首先主要处理 options 配置项
  const rawOptions = getRawOptions(options, this, processResource);
  const instanceBinding: typeof binding = require("@rspack/binding");
  this.#_instance = new instanceBinding.Rspack(
    rawOptions,
    // plugins
    this.builtinPlugins.map(bp => bp.raw()),
    // js_hooks
    {},
    // ThreadsafeNodeFS
    createThreadsafeNodeFSFromRaw(this.outputFileSystem),
    runLoaders.bind(undefined, this)
  );
```

cli 最终通过 createCompiler 获得 compiler 实例，执行 run 方法。

- run
  - 执行 hooks.beforeRun
  - 执行 hooks.run 钩子
  - 最终执行 build 方法, build方法调用 rust 对象的 unsafe_rebuild 方法

## node 和 rust 如何沟通的

Compiler 初始化的时候，会初始化一个 instance，这里主要透传了五个参数
