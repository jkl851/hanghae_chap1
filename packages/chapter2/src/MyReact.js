import { createHooks } from "./hooks.js";
import { render as updateElement, jsx } from "./render.js";

function MyReact() {
  const __ = {
    $root : null,
    rootComponent : null,
    prevNodes : null
  }

  const _render = () => {
    const newNodes = __.rootComponent();
    updateElement(__.$root, newNodes, __.prevNodes);
    resetHookContext();
    __.prevNodes = newNodes;
  };
  function render($root, rootComponent) {
    __.$root = $root;
    __.rootComponent = rootComponent;
    __.prevNodes = null;
    _render();
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
