import PropTypes from "prop-types";

import React from "react";

function TechItem({ tech, onDelete }) {
  return (
    <li key={tech}>
      {tech}
      <button onClick={onDelete} type="button">
        Remover
      </button>
    </li>
  );
}
TechItem.defaultProps = {
  tech: "oculto"
};

TechItem.propTypes = {
  tech: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default TechItem;
