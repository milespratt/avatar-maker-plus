import styled from "styled-components";

const AvatarMakerStyles = styled.div`
  box-sizing: border-box;
  height: 373px;
  width: 675px;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    "title"
    "editor"
    "controls";
  padding: 20px;
  grid-row-gap: 20px;
  position: relative;

  .avatar__maker__close {
    position: absolute;
    color: #67756e;
    top: 20px;
    right: 20px;
    font-size: 21px;
    padding: 0;
    background: none;
    outline: none;
    border: none;
    color: #67756e;
  }

  .avatar__maker * {
    box-sizing: border-box;
  }

  .avatar__maker__title {
    grid-area: title;
    font-weight: bold;
    font-size: 17px;
  }

  .avatar__dropzone {
    border-radius: 10px;
    border: 3px dashed #dbd6d1;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: editor;
  }

  .avatar__dropzone__message {
    font-size: 12px;
    margin: 0;
  }

  .avatar__dropzone__message--bold {
    font-weight: bold;
  }

  .avatar__dropzone__controls {
    display: grid;
    grid-auto-flow: row;
    justify-items: center;

    grid-gap: 10px;
  }

  .avatar__dropzone__icon {
    font-size: 50px;
    color: #2e4238;
  }

  .avatar__maker__controls {
    grid-area: controls;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content min-content 1fr;
    grid-gap: 10px;
    align-items: center;
  }

  .avatar__maker__control {
    cursor: pointer;
    font-size: 12px;
    color: white;
    background: #67756e;
    border-radius: 4px;
    border: none;
    outline: none;
    font-weight: bold;
    padding: 8px 12px;
    white-space: nowrap;
    border: 1px solid #67756e;
  }

  .avatar__maker__control--secondary {
    border: 1px solid #67756e;
    color: #67756e;
    background: white;
  }

  .avatar__maker__control--slim {
    padding: 4px 12px;
    font-size: 11px;
  }

  .avatar__maker__control--inactive {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  .loading__indicator {
    display: flex;
    align-items: center;
    justify-self: end;
  }

  .loading__message {
    white-space: nowrap;
    font-size: 10px;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  .loader {
    margin-left: 10px;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    border-left: 2px solid black;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: loadSpin 1.1s infinite linear;
    animation: loadSpin 1.1s infinite linear;
  }
  @-webkit-keyframes loadSpin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loadSpin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default AvatarMakerStyles;
