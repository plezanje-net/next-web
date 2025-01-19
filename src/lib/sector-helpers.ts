// Dep.: sector.label is deprecated. remove after removed in BE
function labelAndNameToString(label: string | null, name: string | null) {
  return label && name ? `${label} - ${name}` : label || name || "";
}

export { labelAndNameToString };
