export function loadEventData(year, month) {
  const events = [];
  try {
    // Dynamically import all images in the specified directory
    const context = require.context(
      `../../images/events/${year}/${month}`,
      true,
      /\.(png|jpe?g|svg)$/
    );

    // Get unique event dates (folder names)
    const folderNames = new Set(context.keys().map(file => file.split('/')[1]));

    folderNames.forEach(folder => {
      const images = context.keys().filter(file => file.includes(`/${folder}/`)).map(context);
      events.push({
        date: `${month.split('-')[1]} ${folder}, ${year}`, // e.g., 'August 01, 2023'
        images
      });
    });
  } catch (error) {
    console.error("Error loading event data:", error);
  }
  return events;
}
