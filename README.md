# iDocumentos

iDocumentos is a Next.js application to deal with the submission and control of incorrect documents from a university. This was done as a problem challenge for a junior front-end developer job.

----------

# Getting started

## Installation

iDocumentos was made using Next.js with the App Router and the NextAuth to the Auth. In addition, the json-server database was used on port 3001, to the visual was used Tailwind CSS.

Please check the official Next.js installation guide for server requirements before you start. [Official Documentation](https://nextjs.org/docs/getting-started/installation)

### Prerequisites

**Node version 16.8 or later**

### Cloning the repository

```shell
git clone https://github.com/RicardoCSM/idocumentos-app.git
cd idocumentos-app
```

### Install packages

```shell
npm i
```

### Setup .env file

### Environment variables

- `.env` - Environment variables can be set in this file

```js
NEXTAUTH_SECRET=
```

### Start the app

```shell
npm run dev
```

### Start the json-server

```shell
npm run json-server
```

The application can be accessed at [http://localhost:3000](http://localhost:3000).

To register, the following predefined admins id are available:

```shell
151483512

348519383

306668901
```

To sign in, the following predefined user is available

```shell
Username: Admin
Password: admin
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

# Code overview

The project consists of two main screens, the first for students presents a form for sending documents that have some inconsistency. The second screen presents the administration panel with the list of documents with the information coming from the form in addition to the download and save option that changes its status and removes it from the list.

## Folders

- `app` - Contains the icon and the pages
- `app/actions` - Contains the function to return the logged user
- `app/api` - Contains the custom routes
- `app/components` - Contains all project components
- `app/hooks` - Contains hooks for using Modals
- `app/interfaces` - Contains the user interface
- `app/providers` - Contains the Toaster provider
- `data` - Contains the categories and database json
- `pages` - Contains the NextAuth and File download custom routes
- `public/images` - Contains the public images
- `upload` - Contains the uploaded documents
