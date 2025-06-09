import z from "zod";

z.setErrorMap((issue): { message: string } => {
  switch (issue.code) {
    case "invalid_type":
      if (issue.path.includes("idAuxGeoCountry")) return { message: "select-a-country" };
      if (issue.path.includes("idAuxGeoState")) return { message: "select-a-state" };
      if (issue.path.includes("idAuxGeoCity")) return { message: "select-a-city" };
      return { message: "invalid-type" };
    case "invalid_string": {
      if (issue.validation === "email") return { message: "invalid-email" };
      if (issue.validation === "date") return { message: "invalid-date" };
      if (issue.validation === "datetime") return { message: "invalid-datetime" };
      return { message: "invalid-type" };
    }
    case "too_small":
      if (issue.type === "number") return { message: "select-an-option" };
      return { message: "too-small" };
    case "too_big":
      return { message: "too-long" };
    case "invalid_arguments":
      return { message: "invalid-type" };
    case "invalid_date":
      return { message: "invalid-type" };
    case "invalid_enum_value":
      return { message: "invalid-type" };
    case "invalid_intersection_types":
      return { message: "invalid-type" };
    case "custom":
    default:
      return { message: "invalid-type" };
  }
});

export { z as default, z };
