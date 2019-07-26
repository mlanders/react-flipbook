import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import { toRgbaFromHex as toRgba, toHexFromRgba as toHex } from '../logic/colorConversion.js';


export default function ColorBox(props) {

  const { hex: primaryHex, opacity: primaryOpacity } = toHex(props.primaryRgba);
  const { hex: secondaryHex, opacity: secondaryOpacity } = toHex(props.secondaryRgba);

  const handlePrimaryColor = e => {
    let value = toRgba(e.target.value, primaryOpacity);
    props.setColor("primary", value)
  }

  const handleSecondaryColor = e => {
    let value = toRgba(e.target.value, secondaryOpacity);
    props.setColor("secondary", value)
  }

  const handleColorSwitch = () => {
    let [ primary, secondary ] = [ toRgba(primaryHex, primaryOpacity), toRgba(secondaryHex, secondaryOpacity) ];
    props.switchColors(secondary, primary)
  }

  return (
    <div className="color-settings">
      <p>Color</p>
      <label visible="true">
        <div className="color-selector primary" title="Primary Color" style={{ background: primaryHex }} />
        <input style={{display: "none"}} value={primaryHex} onChange={handlePrimaryColor} type="color"/>
      </label>
      <label visible="true">
        <div className="color-selector secondary" title="Secondary Color" style={{ background: secondaryHex }} />
        <input style={{display: "none"}} value={secondaryHex} onChange={handleSecondaryColor} type="color"/>
      </label>
      <FontAwesomeIcon className={"color-switcher"} title="Switch Colors" icon={faSync} onClick={handleColorSwitch}/>
    </div>
  )
}
