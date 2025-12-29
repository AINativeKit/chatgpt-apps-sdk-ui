/**
 * Internal component for Storybook documentation.
 * Not exported from the main package.
 *
 * @internal
 */

import React from 'react';

/**
 * @internal - For Storybook documentation only
 */
export interface PropsTableRow {
  name: string;
  description: string;
  type?: string;
  required?: boolean;
  default?: string;
  theme?: string;
}

interface PropsTableProps {
  rows: PropsTableRow[];
  hideThemeColumn?: boolean;
}

/**
 * Reusable table component for displaying token/component props in Storybook.
 *
 * @internal - For internal use in Storybook stories only. Not part of public API.
 *
 * @example
 * ```tsx
 * <PropsTable rows={[
 *   {
 *     name: 'background',
 *     description: 'Background colors for surfaces',
 *     theme: 'Light & Dark',
 *   },
 * ]} />
 * ```
 */
export const PropsTable: React.FC<PropsTableProps> = ({ rows, hideThemeColumn = false }) => {
  // Check if any row has additional properties
  const hasTypeColumn = rows.some((row) => row.type !== undefined);
  const hasRequiredColumn = rows.some((row) => row.required !== undefined);
  const hasDefaultColumn = rows.some((row) => row.default !== undefined);
  const hasThemeColumn = !hideThemeColumn && rows.some((row) => row.theme !== undefined);

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
        marginBottom: '24px',
        border: '1px solid rgba(121, 116, 126, 0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: 'var(--color-surface-secondary)',
            borderBottom: '1px solid rgba(121, 116, 126, 0.15)',
          }}
        >
          <th
            style={{
              textAlign: 'left',
              padding: '14px 16px',
              fontWeight: '600',
              fontSize: '14px',
              borderRight: '1px solid rgba(121, 116, 126, 0.08)',
            }}
          >
            Name
          </th>
          <th
            style={{
              textAlign: 'left',
              padding: '14px 16px',
              fontWeight: '600',
              fontSize: '14px',
              borderRight:
                hasTypeColumn || hasRequiredColumn || hasDefaultColumn || hasThemeColumn
                  ? '1px solid rgba(121, 116, 126, 0.08)'
                  : 'none',
            }}
          >
            Description
          </th>
          {hasTypeColumn && (
            <th
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                fontWeight: '600',
                fontSize: '14px',
                borderRight:
                  hasRequiredColumn || hasDefaultColumn || hasThemeColumn
                    ? '1px solid rgba(121, 116, 126, 0.08)'
                    : 'none',
              }}
            >
              Type
            </th>
          )}
          {hasRequiredColumn && (
            <th
              style={{
                textAlign: 'center',
                padding: '14px 16px',
                fontWeight: '600',
                fontSize: '14px',
                borderRight:
                  hasDefaultColumn || hasThemeColumn
                    ? '1px solid rgba(121, 116, 126, 0.08)'
                    : 'none',
              }}
            >
              Required
            </th>
          )}
          {hasDefaultColumn && (
            <th
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                fontWeight: '600',
                fontSize: '14px',
                borderRight: hasThemeColumn ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
              }}
            >
              Default
            </th>
          )}
          {hasThemeColumn && (
            <th
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Theme
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} style={{ transition: 'background-color 0.2s ease' }}>
            <td
              style={{
                padding: '14px 16px',
                borderRight: '1px solid rgba(121, 116, 126, 0.08)',
                borderBottom:
                  index < rows.length - 1 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
              }}
            >
              <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>{row.name}</code>
            </td>
            <td
              style={{
                padding: '14px 16px',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                borderRight:
                  hasTypeColumn || hasRequiredColumn || hasDefaultColumn || hasThemeColumn
                    ? '1px solid rgba(121, 116, 126, 0.08)'
                    : 'none',
                borderBottom:
                  index < rows.length - 1 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
              }}
            >
              {row.description}
            </td>
            {hasTypeColumn && (
              <td
                style={{
                  padding: '14px 16px',
                  fontSize: '14px',
                  borderRight:
                    hasRequiredColumn || hasDefaultColumn || hasThemeColumn
                      ? '1px solid rgba(121, 116, 126, 0.08)'
                      : 'none',
                  borderBottom:
                    index < rows.length - 1 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                }}
              >
                <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>{row.type}</code>
              </td>
            )}
            {hasRequiredColumn && (
              <td
                style={{
                  padding: '14px 16px',
                  fontSize: '14px',
                  textAlign: 'center',
                  borderRight:
                    hasDefaultColumn || hasThemeColumn
                      ? '1px solid rgba(121, 116, 126, 0.08)'
                      : 'none',
                  borderBottom:
                    index < rows.length - 1 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                }}
              >
                {row.required ? '✓' : ''}
              </td>
            )}
            {hasDefaultColumn && (
              <td
                style={{
                  padding: '14px 16px',
                  fontSize: '14px',
                  borderRight: hasThemeColumn ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                  borderBottom:
                    index < rows.length - 1 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                }}
              >
                <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>{row.default}</code>
              </td>
            )}
            {hasThemeColumn && (
              <td
                style={{
                  padding: '14px 16px',
                  fontSize: '14px',
                  borderBottom:
                    index < rows.length - 1 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                }}
              >
                {row.theme || 'Light & Dark'}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
