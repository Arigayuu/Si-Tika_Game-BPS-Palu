import React from 'react';
// Adapt the original Figma elements without rasterizing the screen.
export function applyDesignRules(node, rules) {
  if (!React.isValidElement(node)) return node;
  const id = node.props['data-node-id'];
  const children = React.Children.map(node.props.children, child => applyDesignRules(child, rules));
  const element = React.cloneElement(node, {}, children);
  return rules[id] ? rules[id](element) : element;
}
