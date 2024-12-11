const fetchGeolocationData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
  return await response.json();
};

const getBrowserInfo = (userAgent: string) => {
  if (userAgent.includes("Chrome") && userAgent.includes("Edg")) {
    return "Microsoft Edge";
  }
  if (userAgent.includes("Chrome")) {
    return "Google Chrome";
  }
  if (userAgent.includes("Firefox")) {
    return "Mozilla Firefox";
  }
  if (userAgent.includes("Safari")) {
    return "Safari";
  }
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  }
  return "Unknown Browser";
};

const getPlatformInfo = (platform: string) => {
  if (platform.includes("Win")) {
    return "Windows";
  }
  if (platform.includes("Mac")) {
    return "MacOS";
  }
  if (platform.includes("Linux")) {
    return "Linux";
  }
  if (/iPhone|iPad|iPod/.test(platform)) {
    return "iOS";
  }
  if (/Android/.test(platform)) {
    return "Android";
  }
  return "Unknown Platform";
};

const getGeolocation = async () => {
  const ipInfoPromise = fetchGeolocationData("https://ipinfo.io/json/");
  const geoDbPromise = fetchGeolocationData("https://geolocation-db.com/json/");

  try {
    const [ipInfoData, geoDbData] = await Promise.all([
      ipInfoPromise,
      geoDbPromise
    ]);

    const country = ipInfoData.country || geoDbData.country_name || "Unknown";
    const region = ipInfoData.region || geoDbData.state || "Unknown";
    const city = ipInfoData.city || geoDbData.city || "Unknown";
    const ip = ipInfoData.ip || geoDbData.IPv4 || "Unknown";

    return {
      country,
      region,
      city,
      ip
    };
  } catch (error) {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      ip: "Unknown"
    };
  }
};

const gatherTrafficInfo = async () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const geolocationInfo = await getGeolocation();

  return {
    ipAddress: geolocationInfo.ip,
    browser: getBrowserInfo(userAgent),
    os: getPlatformInfo(platform),
    language: navigator.language,
    country: geolocationInfo.country,
    region: geolocationInfo.region,
    city: geolocationInfo.city,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: navigator.cookieEnabled
  };
};

export default gatherTrafficInfo;
