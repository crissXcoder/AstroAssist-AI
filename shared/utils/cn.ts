import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "headline-xl",
            "headline-lg",
            "headline-md",
            "title-lg",
            "title-md",
            "body-lg",
            "body-md",
            "body-sm",
            "label-md",
            "label-sm",
            "mono-stat",
          ],
        },
      ],
      "text-color": [
        {
          text: ["main", "soft", "muted", "faint"],
        },
      ],
      "drop-shadow": ["text-glow"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
