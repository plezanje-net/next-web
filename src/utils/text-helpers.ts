const pluralizeNoun = (
  noun: string,
  count: number,
  nounOnly: boolean = false
) => {
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

    case "smer":
      switch (count % 100) {
        case 1:
          return nounOnly ? "smer" : `${count} smer`;
        default:
          return nounOnly ? "smeri" : `${count} smeri`;
      }

    case "problem":
      switch (count % 100) {
        case 1:
          return `${count} problem`;
        case 2:
          return `${count} problema`;
        case 3:
        case 4:
          return `${count} problemi`;
        default:
          return `${count} problemov`;
      }

    case "smer/problem":
      switch (count % 100) {
        case 1:
          return `${count} smer/problem`;
        case 2:
          return `${count} smeri/problema`;
        case 3:
        case 4:
          return `${count} smeri/problemi`;
        default:
          return `${count} smeri/problemov`;
      }

    case "izbrana smer":
      switch (count % 100) {
        case 1:
          return `${count} izbrana smer`;
        case 2:
          return `${count} izbrani smeri`;
        case 3:
        case 4:
          return `${count} izbrane smeri`;
        default:
          return `${count} izbranih smeri`;
      }
  }
};

export { pluralizeNoun };
