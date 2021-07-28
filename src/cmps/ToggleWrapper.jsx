import React from 'react';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';

export function ToggleWrapper({ obj, onUpdate, idx }) {
    return (
        <div className="toggle-wrapper flex a-center j-center pr">
            <div className="toggle checkcross pa">
                <input type="text" />
                <label className="toggle-item" style={{ backgroundColor: idx === 0 ? obj.value ? '#969696b5' : '#ffeaab' : '#969696b5' }} onClick={() => onUpdate(obj.key, !obj.value)}>
                    <div style={idx === 1 ? { color: obj.value ? 'white' : 'black', backgroundColor: obj.value ? 'black' : 'white' } : {}} className={obj.value ? 'check' : 'uncheck'}>{idx === 0 ? obj.value ? <NightsStayIcon /> : <WbSunnyIcon /> : obj.value ? 'C°' : 'F°'}</div>
                </label>
            </div>
        </div>
    );
}
