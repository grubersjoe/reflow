import { PluginPass } from '@babel/core';
import { VisitNodeFunction } from '@babel/traverse';
import { Node } from '@babel/types';

export type VisitorFunction<T extends Node> = VisitNodeFunction<PluginPass, T>;
