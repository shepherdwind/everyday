(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["views/set.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var t_1;
t_1 = "b";
frame.set("a", t_1);
if(!frame.parent) {
context.setVariable("a", t_1);
context.addExport("a");
}
output += "\n";
var t_2;
t_2 = t_1;
frame.set("b", t_2);
if(!frame.parent) {
context.setVariable("b", t_2);
context.addExport("b");
}
output += "\n";
var t_3;
t_3 = "a";
frame.set("c", t_3);
if(!frame.parent) {
context.setVariable("c", t_3);
context.addExport("c");
}
output += "\n\n";
output += runtime.suppressValue(t_1, env.autoesc);
output += " ";
output += runtime.suppressValue(t_2, env.autoesc);
output += " ";
output += runtime.suppressValue(t_3, env.autoesc);
output += "\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();

