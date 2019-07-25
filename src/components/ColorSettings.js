import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import { toRgbaFromHex as toRgba, toHexFromRgba as toHex } from '../logic/colorConversion.js';


export default function ColorBox(props) {

  const { hex: primaryHex, opacity: primaryOpacity } = toHex(props.primaryRgba);
  const { hex: secondaryHex, opacity: secondaryOpacity } = toHex(props.secondaryRgba);

  const primaryColorHandler = ev => {
    let value = toRgba(ev.target.value, primaryOpacity);
    props.setColor("primary", value)
  }

  const secondaryColorHandler = ev => {
    let value = toRgba(ev.target.value, secondaryOpacity);
    props.setColor("secondary", value)
  }

  const switchColorsHandler = () => {
    let [ primary, secondary ] = [ toRgba(primaryHex, primaryOpacity), toRgba(secondaryHex, secondaryOpacity) ];
    props.switchColors(secondary, primary)
  }

  return (
    <div className="color-settings">
      <p>Color</p>
      <label visible={true}>
        <div className="color-selector primary" title="Primary Color" style={{ background: primaryHex }} />
        <input style={{display: "none"}} value={primaryHex} onChange={primaryColorHandler} type="color"/>
      </label>
      <label visible={true}>
        <div className="color-selector secondary" title="Secondary Color" style={{ background: secondaryHex }} />
        <input style={{display: "none"}} value={secondaryHex} onChange={secondaryColorHandler} type="color"/>
      </label>
      <FontAwesomeIcon className={"color-switcher"} title="Switch Colors" icon={faSync} onClick={switchColorsHandler}/>
    </div>
  )
}
