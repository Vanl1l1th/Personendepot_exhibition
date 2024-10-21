const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.personendepot.ch"
    : "http://localhost:3000";

export default baseUrl;
