const _create = (element = "div") => {
  return document.createElement(element);
};

const _createLink = (text = "", url = "", target = "_self") => {
  const a = _create("a");
  a.href = url;
  a.target = target;
  a.textContent = text;
  return a;
};

const Header = (title, logoUrl) => {
  const getElement = () => {
    const header = _create("header");
    const h1 = _create("h1");
    const link = _createLink(title, logoUrl);
    h1.append(link);
    header.append(h1);
    return header;
  };

  return { getElement };
};

const Main = () => {
  const getElement = () => {
    return _create("main");
  };
  return { getElement };
};

const Footer = () => {
  const _getGithubLogo = (color = "#000") => {
    const logoSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const logoPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    logoSvg.setAttribute("fill", color);
    logoSvg.setAttribute("viewBox", "0 0 16 16");

    logoPath.setAttribute("fill-rule", "evenodd");
    logoPath.setAttribute(
      "d",
      "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    );

    logoSvg.appendChild(logoPath);
    return logoSvg;
  };

  const getElement = () => {
    const footerElement = _create("footer");
    const footerText = _create("p");
    footerText.textContent = "made by: ";

    const githubLink = _createLink(
      " robbe vanslambrouck",
      "https://github.com/RobbeVanslambrouck",
      "_blank"
    );

    githubLink.prepend(_getGithubLogo());

    footerText.append(githubLink);

    footerElement.append(footerText);
    return footerElement;
  };

  return { getElement };
};

export { Header, Main, Footer };
