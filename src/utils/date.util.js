function nowUtc() {
    return new Date().toLocaleString("en-US", {
        timeZone: "UTC",
    });
}

export { nowUtc };
