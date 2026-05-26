"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Type, Mail, Hash, AlignLeft, ChevronDown, CircleDot, CheckSquare } from "lucide-react";
import {
  createDefaultTextField,
  createDefaultEmailField,
  createDefaultNumberField,
  createDefaultTextareaField,
  createDefaultSelectField,
  createDefaultRadioField,
  createDefaultCheckboxField,
} from "../constants/defaultFields";
import { IField } from "@/src/types/form.types";

type Props = {
  dispatch: React.Dispatch<any>;
  insertIndex?: number | null;
  onFieldCreated?: (fieldId: string, insertIndex: number | null) => void;
  onEscape?: () => void;
};

const MENU_ITEMS = [
  {
    id: "text",
    label: "Text",
    description: "Short text answer",
    icon: Type,
    factory: createDefaultTextField,
  },
  {
    id: "email",
    label: "Email",
    description: "Email address",
    icon: Mail,
    factory: createDefaultEmailField,
  },
  {
    id: "number",
    label: "Number",
    description: "Numeric answer",
    icon: Hash,
    factory: createDefaultNumberField,
  },
  {
    id: "textarea",
    label: "Textarea",
    description: "Long text answer",
    icon: AlignLeft,
    factory: createDefaultTextareaField,
  },
  {
    id: "select",
    label: "Select",
    description: "Dropdown menu",
    icon: ChevronDown,
    factory: createDefaultSelectField,
  },
  {
    id: "radio",
    label: "Radio",
    description: "Multiple choice",
    icon: CircleDot,
    factory: createDefaultRadioField,
  },
  {
    id: "checkbox",
    label: "Checkbox",
    description: "Single checkbox",
    icon: CheckSquare,
    factory: createDefaultCheckboxField,
  },
];

const GhostInputArea = React.forwardRef<HTMLInputElement, Props>(
  ({ dispatch, insertIndex = null, onFieldCreated, onEscape }, ref) => {
    const [value, setValue] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = ref as React.RefObject<HTMLInputElement>;
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter items based on what's typed after "/"
    const query = value.startsWith("/") ? value.slice(1).toLowerCase() : "";
    const filteredItems = MENU_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );

    const selectItem = (factory: () => IField) => {
      const newField = factory();
      if (insertIndex !== null) {
        dispatch({
          type: "INSERT_FIELD_AT",
          payload: { field: newField, index: insertIndex },
        });
      } else {
        dispatch({ type: "ADD_FIELD", payload: newField });
      }
      setValue("");
      setMenuOpen(false);
      setActiveIndex(0);
      inputRef.current?.blur();
      // Notify FormEditor so it can focus the new field's label input
      onFieldCreated?.(newField.id, insertIndex);
    };

    const closeMenu = useCallback(() => {
      setMenuOpen(false);
      setActiveIndex(0);
    }, []);

    // Open menu as soon as "/" is typed
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValue(v);
      if (v.startsWith("/")) {
        setMenuOpen(true);
        setActiveIndex(0);
      } else {
        setMenuOpen(false);
      }
    };

    // Keyboard nav
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        setValue("");
        inputRef.current?.blur();
        onEscape?.();
        return;
      }

      if (!menuOpen) {
        if (e.key === "Enter") {
          e.preventDefault();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItems[activeIndex];
        if (item) selectItem(item.factory);
      }
    };

    // Close on click outside
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          closeMenu();
          onEscape?.();
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [closeMenu, onEscape]);

    // Reset active index when filtered list changes
    useEffect(() => {
      setActiveIndex(0);
    }, [query]);


    return (
      <div ref={containerRef} className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type / to add a field..."
          className="w-full text-sm text-gray-400 placeholder:text-gray-300 bg-transparent
                     outline-none py-2 transition-colors
                     focus:text-gray-700 focus:placeholder:text-gray-400"
        />

        {/* Slash menu */}
        {menuOpen && filteredItems.length > 0 && (
          <div
            className="absolute left-0 top-full mt-1 z-50 w-64 rounded-xl border border-gray-100
                       bg-white shadow-lg shadow-gray-200/60 overflow-hidden"
          >
            <div className="p-1">
              {filteredItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => {
                      // prevent input blur before click registers
                      e.preventDefault();
                      selectItem(item.factory);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                               transition-colors duration-75 ${isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0
                                  ${isActive ? "bg-white border border-gray-200" : "bg-gray-100"}`}
                    >
                      <Icon size={14} strokeWidth={1.8} className="text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50/50">
              <p className="text-[10px] text-gray-400 select-none">
                ↑↓ navigate · Enter select · Esc close
              </p>
            </div>
          </div>
        )}

        {/* Empty state when no results match */}
        {menuOpen && filteredItems.length === 0 && (
          <div className="absolute left-0 top-full mt-1 z-50 w-64 rounded-xl border border-gray-100
                          bg-white shadow-lg shadow-gray-200/60 px-4 py-3">
            <p className="text-sm text-gray-400">No matching field types</p>
          </div>
        )}
      </div>
    );
  },
);

GhostInputArea.displayName = "GhostInputArea";

export default GhostInputArea;

