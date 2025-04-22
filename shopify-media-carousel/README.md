# Shopify Media Carousel

## Overview
The Shopify Media Carousel project implements a thumbnail carousel navigation for a media gallery in a Shopify Liquid template. This project enhances the user experience by allowing users to easily navigate through product images and videos.

## Project Structure
The project is organized into several directories and files, each serving a specific purpose:

- **assets/**: Contains the JavaScript and CSS files for the carousel functionality and styling.
  - `thumbnail-carousel.js`: JavaScript code for initializing and managing the thumbnail carousel.
  - `thumbnail-carousel.css`: CSS styles for the carousel layout and appearance.
  - `icon-caret.svg`: SVG icons for navigation buttons.

- **config/**: Contains configuration files for the Shopify theme.
  - `settings_schema.json`: Defines customizable settings for the thumbnail carousel.

- **layout/**: Contains the main layout file for the Shopify theme.
  - `theme.liquid`: The primary HTML structure for the theme.

- **sections/**: Contains section files that define how different parts of the theme are displayed.
  - `product-template.liquid`: Defines the product template section, including the media gallery.

- **snippets/**: Contains reusable code snippets for the theme.
  - `product-media-gallery.liquid`: Renders the product media gallery with carousel functionality.
  - `product-thumbnail.liquid`: Defines the markup for individual product thumbnails.
  - `product-media-modal.liquid`: Code for a modal that displays media in a larger view.

- **templates/**: Contains template files for different pages.
  - `product.liquid`: The main template for product pages.

- **.gitignore**: Specifies files and directories to be ignored by version control.

## Setup Instructions
1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Ensure you have the necessary dependencies installed for your Shopify theme.
3. **Upload Assets**: Upload the contents of the `assets` directory to your Shopify theme's assets.
4. **Integrate Snippets**: Include the snippets in your product template and ensure they are correctly referenced in your Liquid files.
5. **Customize Settings**: Modify the `settings_schema.json` file to customize the carousel settings as needed.

## Usage Guidelines
- The thumbnail carousel will automatically initialize on product pages where the media gallery is included.
- Users can navigate through thumbnails using the provided navigation buttons.
- Ensure that all media items are properly linked to their respective thumbnails for optimal functionality.

## Contributing
Contributions to this project are welcome. Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.