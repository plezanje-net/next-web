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

    case "nova smer":
      switch (count % 100) {
        case 1:
          return nounOnly ? "nova smer" : `${count} nova smer`;
        case 2:
          return nounOnly ? "novi smeri" : `${count} novi smeri`;
        case 3:
        case 4:
          return nounOnly ? "nove smeri" : `${count} nove smeri`;
        default:
          return nounOnly ? "novih smeri" : `${count} novih smeri`;
      }

    case "nov sektor":
      switch (count % 100) {
        case 1:
          return nounOnly ? "nov sektor" : `${count} nov sektor`;
        case 2:
          return nounOnly ? "nova sektorja" : `${count} nova sektorja`;
        case 3:
        case 4:
          return nounOnly ? "novi sektorji" : `${count} novi sektorji`;
        default:
          return nounOnly ? "novih sektorjev" : `${count} novih sektorjev`;
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

const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const genderizeVerb = (verb: string, gender?: string | null) => {
  if (gender == "F") return verb + "a";
  if (gender == "M") return verb;
  return verb + "/a";
};

export { pluralizeNoun, genderizeVerb, capitalizeFirstLetter };
