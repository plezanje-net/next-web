const pluralizeNoun = (noun: string, count: number) => {
  switch (noun) {
    case "uspešen vzpon":
      switch (count % 100) {
        case 1:
          return `${count} uspešen vzpon`;
        case 2:
          return `${count} uspešna vzpona`;
        case 3:
        case 4:
          return `${count} uspešni vzponi`;
        default:
          return `${count} uspešnih vzponov`;
      }

    case "poskus":
      switch (count % 100) {
        case 1:
          return `${count} poskus`;
        case 2:
          return `${count} poskusa`;
        case 3:
        case 4:
          return `${count} poskusi`;
        default:
          return `${count} poskusov`;
      }

    case "plezalec":
      switch (count % 100) {
        case 1:
          return `${count} plezalec`;
        case 2:
          return `${count} plezalca`;
        case 3:
        case 4:
          return `${count} plezalci`;
        default:
          return `${count} plezalcev`;
      }

    case "glas":
      switch (count % 100) {
        case 1:
          return `${count} glas`;
        case 2:
          return `${count} glasova`;
        case 3:
        case 4:
          return `${count} glasovi`;
        default:
          return `${count} glasov`;
      }
  }
};

export { pluralizeNoun };
