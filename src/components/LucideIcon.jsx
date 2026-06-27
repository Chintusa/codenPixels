import React from 'react';
import * as Lucide from 'lucide-react';

export const LucideIcon = ({ name, className, size = 24, ...props }) => {
  // Safe mapping of icon names to actual Lucide components
  const IconComponent = Lucide[name];

  if (!IconComponent) {
    // Return a default icon (like HelpCircle) if the name doesn't match
    const DefaultIcon = Lucide.HelpCircle;
    return <DefaultIcon className={className} size={size} {...props} />;
  }

  return <IconComponent className={className} size={size} {...props} />;
};

export default LucideIcon;
