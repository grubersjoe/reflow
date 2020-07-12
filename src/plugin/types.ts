import { PluginPass } from '@babel/core';
import { VisitNodeFunction } from '@babel/traverse';

export type VisitorFunction<T> = VisitNodeFunction<PluginPass, T>;
