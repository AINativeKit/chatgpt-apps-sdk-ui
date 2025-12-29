/**
 * JSON-to-Component Rendering Utilities
 *
 * This module provides utilities for rendering AINativeKit UI components
 * from JSON configuration objects, enabling AI-powered code generation
 * and dynamic UI rendering.
 */

import { type ComponentType, type ReactNode, createElement } from 'react';

// Import apps-sdk-ui primitives
import { Button, type ButtonProps } from '@openai/apps-sdk-ui/components/Button';
import { Alert, type AlertProps } from '@openai/apps-sdk-ui/components/Alert';
import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';

// Import AINativeKit extension components
import {
  Card,
  SummaryCard,
  ImageCard,
  ListCard,
  type CardProps,
  type SummaryCardProps,
  type ImageCardProps,
  type ListCardProps,
} from '../components/Card';
import { Carousel, type CarouselProps } from '../components/Carousel';
import { List, ListItem, type ListProps, type ListItemProps } from '../components/List';

/**
 * Component configuration for JSON-based rendering
 */
export interface ComponentConfig {
  /** Component type name (e.g., "Button", "SummaryCard") */
  type: string;
  /** Component props as key-value pairs */
  props?: Record<string, unknown>;
  /** Child components or text content */
  children?: ComponentConfig[] | string;
  /** Optional key for React reconciliation */
  key?: string | number;
}

/**
 * Type-safe component props mapping
 */
export interface ComponentPropsMap {
  // apps-sdk-ui primitives
  Button: ButtonProps;
  Alert: AlertProps;
  Badge: BadgeProps;
  // AINativeKit extension components
  Card: CardProps;
  SummaryCard: SummaryCardProps;
  ImageCard: ImageCardProps;
  ListCard: ListCardProps;
  Carousel: CarouselProps;
  List: ListProps;
  ListItem: ListItemProps;
}

/**
 * Registry of available components for JSON rendering
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENT_REGISTRY: Record<string, ComponentType<any>> = {
  // apps-sdk-ui primitives
  Button,
  Alert,
  Badge,
  // AINativeKit extension components
  Card,
  SummaryCard,
  ImageCard,
  ListCard,
  Carousel,
  List,
  ListItem,
} as const;

/**
 * Component names that support JSON-to-component rendering
 */
export type SupportedComponentType = keyof typeof COMPONENT_REGISTRY;

/**
 * Type guard to check if a component type is supported
 */
export function isSupportedComponent(type: string): type is SupportedComponentType {
  return type in COMPONENT_REGISTRY;
}

/**
 * Get component from registry by type name
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComponent(type: string): ComponentType<any> | undefined {
  return COMPONENT_REGISTRY[type];
}

/**
 * Render a single component from JSON configuration
 *
 * @param config - Component configuration object
 * @returns React element or null if component not found
 *
 * @example
 * ```tsx
 * const buttonConfig = {
 *   type: 'Button',
 *   props: { variant: 'primary' },
 *   children: 'Click me'
 * };
 * const button = renderComponent(buttonConfig);
 * ```
 */
export function renderComponent(config: ComponentConfig): ReactNode {
  const { type, props = {}, children, key } = config;

  // Get component from registry
  const Component = getComponent(type);
  if (!Component) {
    console.warn(`Component type "${type}" not found in registry`);
    return null;
  }

  // Process children
  let processedChildren: ReactNode;
  if (typeof children === 'string') {
    processedChildren = children;
  } else if (Array.isArray(children)) {
    processedChildren = children.map((child, index) =>
      renderComponent({ ...child, key: child.key ?? index })
    );
  }

  // Render component using createElement to avoid JSX pragma issues
  return createElement(Component, { key, ...props }, processedChildren);
}

/**
 * Render multiple components from JSON configuration array
 *
 * @param configs - Array of component configuration objects
 * @returns Array of React elements
 *
 * @example
 * ```tsx
 * const configs = [
 *   { type: 'Button', props: { variant: 'primary' }, children: 'Save' },
 *   { type: 'Button', props: { variant: 'secondary' }, children: 'Cancel' }
 * ];
 * const buttons = renderComponents(configs);
 * ```
 */
export function renderComponents(configs: ComponentConfig[]): ReactNode[] {
  return configs.map((config, index) => renderComponent({ ...config, key: config.key ?? index }));
}

/**
 * Type-safe component configuration creator
 *
 * @param type - Component type name
 * @param props - Component props
 * @param children - Child content
 * @returns Component configuration object
 *
 * @example
 * ```tsx
 * const config = createComponentConfig('Button', { variant: 'primary' }, 'Click me');
 * const button = renderComponent(config);
 * ```
 */
export function createComponentConfig<T extends SupportedComponentType>(
  type: T,
  props?: Partial<ComponentPropsMap[T extends keyof ComponentPropsMap ? T : never]>,
  children?: ComponentConfig[] | string
): ComponentConfig {
  return {
    type,
    props: props as unknown as Record<string, unknown>,
    children,
  };
}

/**
 * Validate component configuration against component type
 *
 * @param config - Component configuration to validate
 * @returns Validation result with errors if any
 *
 * @example
 * ```tsx
 * const config = { type: 'Button', props: { variant: 'invalid' } };
 * const result = validateComponentConfig(config);
 * if (!result.valid) {
 *   console.error(result.errors);
 * }
 * ```
 */
export function validateComponentConfig(config: ComponentConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if component type exists
  if (!isSupportedComponent(config.type)) {
    errors.push(`Unknown component type: ${config.type}`);
    return { valid: false, errors };
  }

  // Basic validation - can be extended with JSON Schema validation
  if (config.props && typeof config.props !== 'object') {
    errors.push('Props must be an object');
  }

  if (config.children && typeof config.children !== 'string' && !Array.isArray(config.children)) {
    errors.push('Children must be a string or array of component configs');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Batch render components with error handling
 *
 * @param configs - Array of component configurations
 * @returns Object with successfully rendered components and errors
 *
 * @example
 * ```tsx
 * const configs = [
 *   { type: 'Button', props: { variant: 'primary' }, children: 'Save' },
 *   { type: 'InvalidComponent', props: {} } // This will error
 * ];
 * const { components, errors } = renderComponentsBatch(configs);
 * ```
 */
export function renderComponentsBatch(configs: ComponentConfig[]): {
  components: ReactNode[];
  errors: Array<{ index: number; error: string }>;
} {
  const components: ReactNode[] = [];
  const errors: Array<{ index: number; error: string }> = [];

  configs.forEach((config, index) => {
    const validation = validateComponentConfig(config);
    if (!validation.valid) {
      errors.push({
        index,
        error: validation.errors.join(', '),
      });
      components.push(null);
    } else {
      try {
        components.push(renderComponent({ ...config, key: index }));
      } catch (error) {
        errors.push({
          index,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        components.push(null);
      }
    }
  });

  return { components, errors };
}
