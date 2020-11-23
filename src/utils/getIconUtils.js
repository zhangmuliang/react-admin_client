import React from "react";
import * as Icon from '@ant-design/icons';

export default {
    getIcon(iconType) {
        return (
            React.createElement(
                Icon[iconType],
                {
                    style: { fontSize: '16px', color: '#08c' }
                }
            )
        );
    },
}