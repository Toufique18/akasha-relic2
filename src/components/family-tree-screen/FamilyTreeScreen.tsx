"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  User,
  UserPlus,
  Download,
  Upload,
  Maximize2,
  Heart,
  X,
  ChevronRight,
  Info,
  Calendar,
  MapPin,
  Briefcase,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  ChevronDown,
  Settings
} from "lucide-react";

export interface FamilyMember {
  id: string;
  name: string;
  gender: "male" | "female" | "other";
  birthDate: string;
  deathDate?: string;
  birthPlace?: string;
  occupation?: string;
  bio?: string;
  spouseId?: string;
  fatherId?: string;
  motherId?: string;
  x: number;
  y: number;
}

const DEFAULT_NODES: FamilyMember[] = [
  {
    id: "grandfather",
    name: "Arthur Pendragon Sr.",
    gender: "male",
    birthDate: "1930-05-15",
    deathDate: "2012-11-20",
    birthPlace: "Camelot, England",
    occupation: "Historian & Archivist",
    bio: "Pioneered the collection of regional history and folklore. Loved classic literature and chess.",
    spouseId: "grandmother",
    x: 200,
    y: 80
  },
  {
    id: "grandmother",
    name: "Guinevere Pendragon",
    gender: "female",
    birthDate: "1935-09-08",
    deathDate: "2018-04-03",
    birthPlace: "London, UK",
    occupation: "Professor of Literature",
    bio: "Dedicated her life to teaching medieval poetry. Known for her gardening skills and kindness.",
    spouseId: "grandfather",
    x: 480,
    y: 80
  },
  {
    id: "father",
    name: "Uther Pendragon",
    gender: "male",
    birthDate: "1960-03-22",
    birthPlace: "Oxford, UK",
    occupation: "Chief Architect",
    bio: "Passionate about cathedral restoration and modern green architecture. Enjoys sailing.",
    fatherId: "grandfather",
    motherId: "grandmother",
    spouseId: "mother",
    x: 100,
    y: 300
  },
  {
    id: "mother",
    name: "Igraine Pendragon",
    gender: "female",
    birthDate: "1964-07-14",
    birthPlace: "Paris, France",
    occupation: "Medical Doctor",
    bio: "Pediatrician with over 30 years of public service. Enthusiastic pianist and French baker.",
    spouseId: "father",
    x: 380,
    y: 300
  },
  {
    id: "uncle",
    name: "Morgan Pendragon",
    gender: "male",
    birthDate: "1962-11-02",
    birthPlace: "Oxford, UK",
    occupation: "Creative Writer",
    bio: "Author of historical novels. Spends half the year traveling and researching old archives.",
    fatherId: "grandfather",
    motherId: "grandmother",
    x: 680,
    y: 300
  },
  {
    id: "sibling",
    name: "Morgana Pendragon",
    gender: "female",
    birthDate: "1993-01-30",
    birthPlace: "Bristol, UK",
    occupation: "Environmental Scientist",
    bio: "Researching coral reef preservation. Active outdoor climber and wildlife photographer.",
    fatherId: "father",
    motherId: "mother",
    x: -80,
    y: 520
  },
  {
    id: "self",
    name: "Arthur Pendragon Jr.",
    gender: "male",
    birthDate: "1990-10-10",
    birthPlace: "London, UK",
    occupation: "Software Engineer",
    bio: "Web developer passionate about open source, graph layouts, and historical digital archives.",
    fatherId: "father",
    motherId: "mother",
    spouseId: "spouse",
    x: 180,
    y: 520
  },
  {
    id: "spouse",
    name: "Elena Vance",
    gender: "female",
    birthDate: "1992-04-05",
    birthPlace: "Boston, USA",
    occupation: "Biotech Researcher",
    bio: "Working on gene editing therapies. Loving mother, long-distance runner, and oil painter.",
    spouseId: "self",
    x: 460,
    y: 520
  },
  {
    id: "son",
    name: "Robin Pendragon",
    gender: "male",
    birthDate: "2018-08-25",
    birthPlace: "London, UK",
    occupation: "Kindergarten Student",
    bio: "Loves dinosaurs, building lego spaceships, and playing with dog Merlin.",
    fatherId: "self",
    motherId: "spouse",
    x: 180,
    y: 740
  },
  {
    id: "daughter",
    name: "Lily Pendragon",
    gender: "female",
    birthDate: "2021-12-12",
    birthPlace: "London, UK",
    occupation: "Toddler",
    bio: "Enjoys drawing on walls, animal picture books, and jumping in puddles.",
    fatherId: "self",
    motherId: "spouse",
    x: 460,
    y: 740
  }
];

const THEMES = {
  midnight: {
    name: "Midnight Glow",
    bg: "bg-[#020215]",
    gridPattern: "rgba(255, 255, 255, 0.03)",
    cardBg: "bg-slate-950/80 border-slate-800/80 text-white",
    maleBorder: "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    femaleBorder: "border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.15)]",
    otherBorder: "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    lineColor: "rgba(99, 102, 241, 0.5)",
    lineHoverColor: "rgba(99, 102, 241, 0.95)",
    fontFamily: "font-sans",
    uiText: "text-slate-300",
    buttonBg: "bg-indigo-600 hover:bg-indigo-500 text-white",
    secondaryButtonBg: "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
  },
  cyberpunk: {
    name: "Cybernetic Neon",
    bg: "bg-[#050508]",
    gridPattern: "rgba(0, 255, 242, 0.04)",
    cardBg: "bg-zinc-950/90 border-zinc-800 text-[#00ffc2]",
    maleBorder: "border-cyan-400 shadow-[0_0_15px_rgba(6,255,242,0.3)]",
    femaleBorder: "border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]",
    otherBorder: "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]",
    lineColor: "#ffff00",
    lineHoverColor: "#00ffc2",
    fontFamily: "font-mono",
    uiText: "text-zinc-400",
    buttonBg: "bg-[#00ffc2] hover:bg-[#00cc9e] text-zinc-950 font-bold",
    secondaryButtonBg: "bg-zinc-900 hover:bg-zinc-800 text-[#00ffc2] border-[#00ffc2]/35"
  },
  heritage: {
    name: "Heritage Parchment",
    bg: "bg-[#faf6ee]",
    gridPattern: "rgba(139, 90, 43, 0.06)",
    cardBg: "bg-[#fffdf9] border-amber-900/20 text-amber-950",
    maleBorder: "border-blue-900/30 shadow-[0_4px_10px_rgba(0,0,0,0.05)] bg-[#f3f7fa]",
    femaleBorder: "border-rose-900/30 shadow-[0_4px_10px_rgba(0,0,0,0.05)] bg-[#faf3f3]",
    otherBorder: "border-amber-900/30 shadow-[0_4px_10px_rgba(0,0,0,0.05)] bg-[#faf6f3]",
    lineColor: "#8b5a2b",
    lineHoverColor: "#603710",
    fontFamily: "font-serif",
    uiText: "text-amber-900/80",
    buttonBg: "bg-amber-800 hover:bg-amber-700 text-white",
    secondaryButtonBg: "bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300"
  }
};

const CARD_WIDTH = 220;
const CARD_HEIGHT = 90;

export const FamilyTreeScreen = () => {
  const [nodes, setNodes] = useState<FamilyMember[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Pan and zoom states
  const [pan, setPan] = useState({ x: 100, y: 40 });
  const [zoom, setZoom] = useState(0.95);
  const [isPanning, setIsPanning] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState<keyof typeof THEMES>("midnight");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isToolsExpanded, setIsToolsExpanded] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // Dialog states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addRelationType, setAddRelationType] = useState<"spouse" | "father" | "mother" | "child">("child");
  const [addModalSourceNodeId, setAddModalSourceNodeId] = useState<string | null>(null);

  // New/Edited Member Form State
  const [formName, setFormName] = useState("");
  const [formGender, setFormGender] = useState<"male" | "female" | "other">("male");
  const [formBirthDate, setFormBirthDate] = useState("");
  const [formDeathDate, setFormDeathDate] = useState("");
  const [formBirthPlace, setFormBirthPlace] = useState("");
  const [formOccupation, setFormOccupation] = useState("");
  const [formBio, setFormBio] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const dragStartRef = useRef<{ screenX: number; screenY: number; nodeX: number; nodeY: number } | null>(null);

  // Load from localstorage or load default
  useEffect(() => {
    const saved = localStorage.getItem("family_tree_nodes_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setNodes(parsed);
        } else {
          setNodes(DEFAULT_NODES);
        }
      } catch (e) {
        console.error("Failed to parse family tree nodes from storage", e);
        setNodes(DEFAULT_NODES);
      }
    } else {
      setNodes(DEFAULT_NODES);
    }
  }, []);

  const saveNodes = (newNodes: FamilyMember[]) => {
    setNodes(newNodes);
    localStorage.setItem("family_tree_nodes_v1", JSON.stringify(newNodes));
  };

  const selectedNode = useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  // Selected node relationships for inspector badge links
  const relatedMembers = useMemo(() => {
    if (!selectedNode) return { father: null, mother: null, spouse: null, children: [] };
    return {
      father: nodes.find(n => n.id === selectedNode.fatherId) || null,
      mother: nodes.find(n => n.id === selectedNode.motherId) || null,
      spouse: nodes.find(n => n.id === selectedNode.spouseId) || null,
      children: nodes.filter(n => n.fatherId === selectedNode.id || n.motherId === selectedNode.id)
    };
  }, [selectedNode, nodes]);

  // Handle zooming via mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.08;
    let nextZoom = zoom + (e.deltaY < 0 ? zoomFactor : -zoomFactor);
    nextZoom = Math.max(0.4, Math.min(2.0, nextZoom));
    setZoom(nextZoom);
  };

  // Canvas Panning Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (draggedNodeId) return; // Ignore if dragging a node
    // Only left click triggers pan
    if (e.button !== 0) return;
    
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNodeId && dragStartRef.current) {
      const dx = e.clientX - dragStartRef.current.screenX;
      const dy = e.clientY - dragStartRef.current.screenY;
      
      const newNodes = nodes.map(node => {
        if (node.id === draggedNodeId) {
          return {
            ...node,
            x: Math.round(dragStartRef.current!.nodeX + dx / zoom),
            y: Math.round(dragStartRef.current!.nodeY + dy / zoom)
          };
        }
        return node;
      });
      setNodes(newNodes);
    } else if (isPanning) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + dx,
        y: panStartRef.current.panY + dy
      });
    }
  };

  const handleMouseUp = () => {
    if (draggedNodeId) {
      saveNodes(nodes); // Save coordinate changes to localStorage
      setDraggedNodeId(null);
      dragStartRef.current = null;
    }
    setIsPanning(false);
  };

  const handleNodeDragStart = (e: React.MouseEvent, node: FamilyMember) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    setDraggedNodeId(node.id);
    setSelectedNodeId(node.id);
    setIsEditMode(false);
    
    dragStartRef.current = {
      screenX: e.clientX,
      screenY: e.clientY,
      nodeX: node.x,
      nodeY: node.y
    };
  };

  // Touch Handlers for Mobile Responsiveness (Panning & Dragging)
  const handleCanvasTouchStart = (e: React.TouchEvent) => {
    if (draggedNodeId) return;
    const touch = e.touches[0];
    setIsPanning(true);
    panStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    
    if (draggedNodeId && dragStartRef.current) {
      const dx = touch.clientX - dragStartRef.current.screenX;
      const dy = touch.clientY - dragStartRef.current.screenY;
      
      const newNodes = nodes.map(node => {
        if (node.id === draggedNodeId) {
          return {
            ...node,
            x: Math.round(dragStartRef.current!.nodeX + dx / zoom),
            y: Math.round(dragStartRef.current!.nodeY + dy / zoom)
          };
        }
        return node;
      });
      setNodes(newNodes);
    } else if (isPanning) {
      const dx = touch.clientX - panStartRef.current.x;
      const dy = touch.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + dx,
        y: panStartRef.current.panY + dy
      });
    }
  };

  const handleTouchEnd = () => {
    if (draggedNodeId) {
      saveNodes(nodes);
      setDraggedNodeId(null);
      dragStartRef.current = null;
    }
    setIsPanning(false);
  };

  const handleNodeTouchStart = (e: React.TouchEvent, node: FamilyMember) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setDraggedNodeId(node.id);
    setSelectedNodeId(node.id);
    setIsEditMode(false);
    
    dragStartRef.current = {
      screenX: touch.clientX,
      screenY: touch.clientY,
      nodeX: node.x,
      nodeY: node.y
    };
  };

  // Open add relative modal
  const openAddModal = (sourceNodeId: string, relationType: typeof addRelationType) => {
    setAddModalSourceNodeId(sourceNodeId);
    setAddRelationType(relationType);
    
    // Default form details
    setFormName("");
    setFormGender(relationType === "father" ? "male" : relationType === "mother" ? "female" : "male");
    setFormBirthDate("");
    setFormDeathDate("");
    setFormBirthPlace("");
    setFormOccupation("");
    setFormBio("");
    
    setIsAddModalOpen(true);
  };

  const submitAddRelation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !addModalSourceNodeId) return;

    const sourceNode = nodes.find(n => n.id === addModalSourceNodeId);
    if (!sourceNode) return;

    const newId = `member_${Date.now()}`;
    
    // Smart default coordinates based on relationship
    let newX = sourceNode.x;
    let newY = sourceNode.y;
    
    if (addRelationType === "spouse") {
      newX = sourceNode.x + 280;
    } else if (addRelationType === "child") {
      newY = sourceNode.y + 200;
      newX = sourceNode.x + (Math.random() * 60 - 30);
    } else if (addRelationType === "father" || addRelationType === "mother") {
      newY = sourceNode.y - 200;
      newX = sourceNode.x + (addRelationType === "father" ? -140 : 140);
    }

    const newMember: FamilyMember = {
      id: newId,
      name: formName.trim(),
      gender: formGender,
      birthDate: formBirthDate || "Unknown",
      ...(formDeathDate && { deathDate: formDeathDate }),
      birthPlace: formBirthPlace || undefined,
      occupation: formOccupation || undefined,
      bio: formBio || undefined,
      x: newX,
      y: newY
    };

    let updatedNodes = [...nodes, newMember];

    // Establish links
    updatedNodes = updatedNodes.map(node => {
      // Spouse relation
      if (addRelationType === "spouse" && node.id === sourceNode.id) {
        return { ...node, spouseId: newId };
      }
      if (addRelationType === "spouse" && node.id === newId) {
        return { ...node, spouseId: sourceNode.id };
      }

      // Parent relations (Adding parent to sourceNode)
      if (addRelationType === "father" && node.id === sourceNode.id) {
        return { ...node, fatherId: newId };
      }
      if (addRelationType === "mother" && node.id === sourceNode.id) {
        return { ...node, motherId: newId };
      }

      // Child relation
      if (addRelationType === "child" && node.id === newId) {
        // If source node is male, set fatherId. If female, set motherId.
        // If source node has a spouse, set the other parentId as well!
        const isFather = sourceNode.gender === "male";
        return {
          ...node,
          fatherId: isFather ? sourceNode.id : (sourceNode.spouseId || undefined),
          motherId: !isFather ? sourceNode.id : (sourceNode.spouseId || undefined)
        };
      }

      return node;
    });

    saveNodes(updatedNodes);
    setIsAddModalOpen(false);
    setSelectedNodeId(newId);
  };

  // Delete node and clean relationships
  const deleteMember = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this family member? All their relationship links will be updated.")) return;

    let updatedNodes = nodes.filter(n => n.id !== id);

    // Clean up references to this node in others
    updatedNodes = updatedNodes.map(node => {
      const cleanNode = { ...node };
      if (cleanNode.spouseId === id) delete cleanNode.spouseId;
      if (cleanNode.fatherId === id) delete cleanNode.fatherId;
      if (cleanNode.motherId === id) delete cleanNode.motherId;
      return cleanNode;
    });

    saveNodes(updatedNodes);
    setSelectedNodeId(null);
  };

  // Submit edits for selected node
  const handleEditMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNode) return;

    const updatedNodes = nodes.map(node => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          name: formName.trim(),
          gender: formGender,
          birthDate: formBirthDate,
          deathDate: formDeathDate || undefined,
          birthPlace: formBirthPlace || undefined,
          occupation: formOccupation || undefined,
          bio: formBio || undefined
        };
      }
      return node;
    });

    saveNodes(updatedNodes);
    setIsEditMode(false);
  };

  // Start edit mode inside drawer
  const enterEditMode = () => {
    if (!selectedNode) return;
    setFormName(selectedNode.name);
    setFormGender(selectedNode.gender);
    setFormBirthDate(selectedNode.birthDate);
    setFormDeathDate(selectedNode.deathDate || "");
    setFormBirthPlace(selectedNode.birthPlace || "");
    setFormOccupation(selectedNode.occupation || "");
    setFormBio(selectedNode.bio || "");
    setIsEditMode(true);
  };

  // Auto Layout implementation
  const runAutoLayout = () => {
    if (nodes.length === 0) return;

    const generation: Record<string, number> = {};
    const visited = new Set<string>();
    const queue: string[] = [];

    // Find the oldest ancestor node (without parents) as the layout root
    const root = nodes.find(n => !n.fatherId && !n.motherId) || nodes[0];
    generation[root.id] = 0;
    queue.push(root.id);
    visited.add(root.id);

    while (queue.length > 0) {
      const currId = queue.shift()!;
      const currNode = nodes.find(n => n.id === currId)!;
      const currGen = generation[currId];

      const relatives: { id: string; gen: number }[] = [];

      if (currNode.spouseId) {
        relatives.push({ id: currNode.spouseId, gen: currGen });
      }
      if (currNode.fatherId) {
        relatives.push({ id: currNode.fatherId, gen: currGen - 1 });
      }
      if (currNode.motherId) {
        relatives.push({ id: currNode.motherId, gen: currGen - 1 });
      }
      
      // Children
      nodes.forEach(n => {
        if (n.fatherId === currId || n.motherId === currId) {
          relatives.push({ id: n.id, gen: currGen + 1 });
        }
      });

      relatives.forEach(rel => {
        if (!visited.has(rel.id)) {
          visited.add(rel.id);
          generation[rel.id] = rel.gen;
          queue.push(rel.id);
        }
      });
    }

    // Assign fallback gen for disconnected nodes
    nodes.forEach(node => {
      if (generation[node.id] === undefined) {
        generation[node.id] = 0;
      }
    });

    // Group IDs by generation level
    const genGroups: Record<number, string[]> = {};
    nodes.forEach(node => {
      const gen = generation[node.id];
      if (!genGroups[gen]) {
        genGroups[gen] = [];
      }
      genGroups[gen].push(node.id);
    });

    // Lay out horizontally centered
    const updatedNodes = [...nodes];
    const gapX = 60;
    const stepX = CARD_WIDTH + gapX;
    const stepY = 220;

    const minGen = Math.min(...Object.keys(genGroups).map(Number));

    Object.entries(genGroups).forEach(([genStr, memberIds]) => {
      const gen = parseInt(genStr, 10);
      const sortedIds: string[] = [];
      const idSet = new Set(memberIds);

      // Try to group spouses next to each other
      while (idSet.size > 0) {
        const id = Array.from(idSet)[0];
        idSet.delete(id);
        sortedIds.push(id);

        const m = nodes.find(n => n.id === id)!;
        if (m.spouseId && idSet.has(m.spouseId)) {
          idSet.delete(m.spouseId);
          sortedIds.push(m.spouseId);
        }
      }

      const count = sortedIds.length;
      // Centering around Canvas X = 320
      const startX = 320 - ((count - 1) * stepX) / 2;

      sortedIds.forEach((id, idx) => {
        const nodeIndex = updatedNodes.findIndex(n => n.id === id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            x: startX + idx * stepX,
            y: 80 + (gen - minGen) * stepY
          };
        }
      });
    });

    saveNodes(updatedNodes);
    setPan({ x: 120, y: 50 });
    setZoom(0.85);
  };

  // Reset Tree to default demo
  const resetToDemo = () => {
    if (window.confirm("This will erase all your custom family members and restore the 3-generation demo tree. Proceed?")) {
      saveNodes(DEFAULT_NODES);
      setSelectedNodeId("self");
      setPan({ x: 120, y: 50 });
      setZoom(0.85);
    }
  };

  // Reset canvas coordinates to center the tree
  const centerTree = () => {
    setPan({ x: 120, y: 50 });
    setZoom(0.85);
  };

  // Export current tree as JSON file
  const exportTreeJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(nodes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `family_tree_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON tree
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported) && imported.length > 0 && "id" in imported[0]) {
          saveNodes(imported);
          setSelectedNodeId(imported[0].id);
          centerTree();
        } else {
          alert("Invalid family tree JSON format.");
        }
      } catch (err) {
        console.error("Failed to parse JSON file", err);
        alert("Error parsing file. Please make sure it is a valid JSON file.");
      }
    };
    fileReader.readAsText(files[0]);
  };

  // Generate connection paths
  const connectionPaths = useMemo(() => {
    const paths: { key: string; d: string; isHighlighted: boolean }[] = [];
    const drawnSpouses = new Set<string>();

    nodes.forEach(node => {
      const isNodeActive = selectedNodeId === node.id || hoveredNodeId === node.id;

      // 1. Draw spouse line
      if (node.spouseId) {
        const spouse = nodes.find(n => n.id === node.spouseId);
        if (spouse && !drawnSpouses.has(node.id) && !drawnSpouses.has(spouse.id)) {
          drawnSpouses.add(node.id);
          drawnSpouses.add(spouse.id);

          const isSpouseActive = selectedNodeId === spouse.id || hoveredNodeId === spouse.id;
          const isHighlighted = isNodeActive || isSpouseActive;

          // Determine who is left and right
          const leftNode = node.x < spouse.x ? node : spouse;
          const rightNode = node.x < spouse.x ? spouse : node;

          const startX = leftNode.x + CARD_WIDTH;
          const startY = leftNode.y + CARD_HEIGHT / 2;
          const endX = rightNode.x;
          const endY = rightNode.y + CARD_HEIGHT / 2;

          // Curve line horizontally if not on the exact same row
          const path = `M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`;
          paths.push({
            key: `spouse_${node.id}_${spouse.id}`,
            d: path,
            isHighlighted
          });
        }
      }

      // 2. Draw child line from parent(s)
      if (node.fatherId || node.motherId) {
        const father = nodes.find(n => n.id === node.fatherId);
        const mother = nodes.find(n => n.id === node.motherId);
        
        const isFatherActive = !!(father && (selectedNodeId === father.id || hoveredNodeId === father.id));
        const isMotherActive = !!(mother && (selectedNodeId === mother.id || hoveredNodeId === mother.id));
        const isHighlighted = !!(isNodeActive || isFatherActive || isMotherActive);

        const childTopX = node.x + CARD_WIDTH / 2;
        const childTopY = node.y;

        // If both parents exist and are spouses, start line from spouse midpoint
        if (father && mother && (father.spouseId === mother.id || mother.spouseId === father.id)) {
          // Midpoint of parents
          const parentMidX = (father.x + mother.x) / 2 + CARD_WIDTH / 2;
          const parentMidY = (father.y + mother.y) / 2 + CARD_HEIGHT / 2;

          const midY = parentMidY + (childTopY - parentMidY) * 0.45;
          const path = `M ${parentMidX} ${parentMidY} C ${parentMidX} ${midY}, ${childTopX} ${midY}, ${childTopX} ${childTopY}`;
          paths.push({
            key: `child_parents_${node.id}`,
            d: path,
            isHighlighted
          });
        } else {
          // Draw individual lines for single parents or non-spouse parents
          if (father) {
            const startX = father.x + CARD_WIDTH / 2;
            const startY = father.y + CARD_HEIGHT;
            const midY = startY + (childTopY - startY) * 0.45;
            const path = `M ${startX} ${startY} C ${startX} ${midY}, ${childTopX} ${midY}, ${childTopX} ${childTopY}`;
            paths.push({
              key: `child_father_${node.id}`,
              d: path,
              isHighlighted: isNodeActive || isFatherActive
            });
          }
          if (mother) {
            const startX = mother.x + CARD_WIDTH / 2;
            const startY = mother.y + CARD_HEIGHT;
            const midY = startY + (childTopY - startY) * 0.45;
            const path = `M ${startX} ${startY} C ${startX} ${midY}, ${childTopX} ${midY}, ${childTopX} ${childTopY}`;
            paths.push({
              key: `child_mother_${node.id}`,
              d: path,
              isHighlighted: isNodeActive || isMotherActive
            });
          }
        }
      }
    });

    return paths;
  }, [nodes, selectedNodeId, hoveredNodeId]);

  // Find union points for spouse decorators
  const marriageMidpoints = useMemo(() => {
    const midpoints: { x: number; y: number; id: string }[] = [];
    const drawn = new Set<string>();

    nodes.forEach(node => {
      if (node.spouseId) {
        const spouse = nodes.find(n => n.id === node.spouseId);
        if (spouse && !drawn.has(node.id) && !drawn.has(spouse.id)) {
          drawn.add(node.id);
          drawn.add(spouse.id);

          const leftNode = node.x < spouse.x ? node : spouse;
          const rightNode = node.x < spouse.x ? spouse : node;

          const startX = leftNode.x + CARD_WIDTH;
          const startY = leftNode.y + CARD_HEIGHT / 2;
          const endX = rightNode.x;
          const endY = rightNode.y + CARD_HEIGHT / 2;

          midpoints.push({
            x: (startX + endX) / 2,
            y: (startY + endY) / 2,
            id: `mid_${node.id}_${spouse.id}`
          });
        }
      }
    });

    return midpoints;
  }, [nodes]);

  // Search filter
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.filter(n => 
      n.name.toLowerCase().includes(q) || 
      (n.occupation && n.occupation.toLowerCase().includes(q)) ||
      (n.birthPlace && n.birthPlace.toLowerCase().includes(q))
    );
  }, [nodes, searchQuery]);

  const currentTheme = THEMES[activeTheme];

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] ${currentTheme.bg} transition-colors duration-500 flex flex-col relative overflow-hidden text-white pt-20 pb-0 ${currentTheme.fontFamily}`}>
      
      {/* Top Banner Gradient background matching main theme */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="absolute w-[120%] left-[-10%] top-[0%] h-[150px] bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent opacity-60 blur-3xl rounded-full" />
      </div>

      {/* Floating Canvas background grid pattern */}
      <div 
        className="absolute inset-0 transition-all pointer-events-none select-none duration-300 opacity-60 z-0" 
        style={{
          backgroundImage: `radial-gradient(${currentTheme.gridPattern} 1.5px, transparent 1.5px)`,
          backgroundSize: `${30 * zoom}px ${30 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      />

      {/* Page Title & Search bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            Family <span className="text-[#C5FF41] italic font-serif">Tree Builder</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build, visualize, and preserve your family heritage interactively.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative max-w-xs w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search family members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 backdrop-blur-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Theme Selector */}
          <div className="relative group" onMouseLeave={() => setIsThemeOpen(false)}>
            <button 
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-slate-900/60 border border-slate-800 text-slate-300 rounded-xl hover:text-white transition-all"
            >
              <span>Theme: {THEMES[activeTheme].name}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className={`absolute right-0 mt-1.5 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl transition-all duration-200 z-50 py-1.5 overflow-hidden ${
              isThemeOpen ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"
            }`}>
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTheme(t);
                    setIsThemeOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                    activeTheme === t ? "text-indigo-400 bg-slate-800/50" : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                  }`}
                >
                  <span>{THEMES[t].name}</span>
                  {activeTheme === t && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sandbox Interactive Workspace */}
      <div 
        ref={canvasRef}
        className="flex-grow w-full h-[520px] md:h-[680px] relative overflow-hidden select-none cursor-grab active:cursor-grabbing border-y border-white/5 my-4 bg-transparent z-10"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleCanvasTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Zoom & Pan Widget Controls (Left Corner) */}
        <div className="absolute left-6 bottom-6 flex flex-col gap-2 z-30 pointer-events-auto">
          <div className="flex flex-col bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
            <button 
              onClick={() => setZoom(prev => Math.min(2.0, prev + 0.1))}
              className="p-3 text-slate-400 hover:text-white hover:bg-white/5 border-b border-slate-800 transition-colors"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))}
              className="p-3 text-slate-400 hover:text-white hover:bg-white/5 border-b border-slate-800 transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button 
              onClick={centerTree}
              className="p-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-b border-slate-800"
              title="Reset View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button 
              onClick={runAutoLayout}
              className="p-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/5 transition-colors"
              title="Auto-Arrange Layout"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Save/Backup Widget Controls (Right Corner) */}
        <div className="absolute right-6 bottom-6 flex flex-col items-end gap-2 z-30 pointer-events-auto">
          {/* Mobile Collapsible Actions Menu */}
          <div className="flex md:hidden flex-col items-end gap-2">
            <AnimatePresence>
              {isToolsExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="flex flex-col gap-2 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl backdrop-blur-md shadow-2xl"
                >
                  <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-lg cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                  <button
                    onClick={() => {
                      exportTreeJSON();
                      setIsToolsExpanded(false);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Backup</span>
                  </button>
                  <button
                    onClick={() => {
                      resetToDemo();
                      setIsToolsExpanded(false);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-950/40 border border-red-900/30 text-red-400 text-xs font-semibold rounded-lg"
                  >
                    <span>Reset Demo</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsToolsExpanded(!isToolsExpanded)}
              className="flex items-center justify-center w-10 h-10 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-400 hover:text-white shadow-xl backdrop-blur-md"
            >
              {isToolsExpanded ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            </button>
          </div>

          {/* Desktop view: display buttons side by side */}
          <div className="hidden md:flex gap-2.5">
            <label 
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold rounded-xl cursor-pointer hover:bg-white/5 transition-colors shadow-xl backdrop-blur-md"
              title="Import Family Tree backup"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
            
            <button 
              onClick={exportTreeJSON}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold rounded-xl hover:bg-white/5 transition-colors shadow-xl backdrop-blur-md"
              title="Export Family Tree backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Backup</span>
            </button>

            <button 
              onClick={resetToDemo}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-red-950/40 border border-red-800/30 text-red-400 hover:text-red-300 text-xs font-semibold rounded-xl hover:bg-red-550/10 transition-colors shadow-xl backdrop-blur-md"
              title="Reset to 3-generation Demo Tree"
            >
              <span>Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Dynamic Zoomed-and-Panned Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "top left"
          }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Connector Paths SVG (Behind Nodes) */}
          <svg className="absolute inset-0 overflow-visible pointer-events-none select-none z-0">
            {/* Define Glow Filter for active lines in dark theme */}
            <defs>
              <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {connectionPaths.map(path => (
              <path
                key={path.key}
                d={path.d}
                fill="none"
                stroke={path.isHighlighted ? currentTheme.lineHoverColor : currentTheme.lineColor}
                strokeWidth={path.isHighlighted ? 3 : 1.8}
                strokeDasharray={!path.isHighlighted && activeTheme === "cyberpunk" ? "4,4" : "0"}
                filter={path.isHighlighted && activeTheme !== "heritage" ? "url(#line-glow)" : undefined}
                className="transition-all duration-300"
              />
            ))}

            {/* Render Marriage/Union Hearts midpoints */}
            {marriageMidpoints.map(pt => (
              <g 
                key={pt.id} 
                transform={`translate(${pt.x - 11}, ${pt.y - 11})`}
                className="pointer-events-none"
              >
                <circle 
                  cx="11" 
                  cy="11" 
                  r="10.5" 
                  fill={activeTheme === "heritage" ? "#fffdf9" : "#020215"} 
                  stroke={currentTheme.lineColor} 
                  strokeWidth="1.5" 
                />
                <path 
                  d="M11 15.5l-3.32-3.15C6.5 11.23 6 10.36 6 9.38c0-1.87 1.48-3.38 3.3-3.38 1.02 0 1.95.48 2.7 1.25.75-.77 1.68-1.25 2.7-1.25 1.82 0 3.3 1.5 3.3 3.38 0 .98-.5 1.85-1.68 2.97L11 15.5z" 
                  fill={activeTheme === "heritage" ? "#8b5a2b" : "#6366f1"}
                  className="scale-[0.8] origin-center translate-x-[2.2px] translate-y-[2px]" 
                />
              </g>
            ))}
          </svg>

          {/* Interactive Member Cards (Nodes) */}
          <div className="absolute inset-0 z-10 pointer-events-auto">
            {filteredNodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              
              // Gender-specific card class styles
              let genderBorder = currentTheme.otherBorder;
              let avatarColor = "bg-purple-900/30 text-purple-400";
              if (node.gender === "male") {
                genderBorder = currentTheme.maleBorder;
                avatarColor = "bg-cyan-900/30 text-cyan-400";
              } else if (node.gender === "female") {
                genderBorder = currentTheme.femaleBorder;
                avatarColor = "bg-pink-900/30 text-pink-400";
              }

              // Selected state override
              const isSearching = searchQuery.trim() !== "";
              const matchedSearch = isSearching && (
                node.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleNodeDragStart(e, node)}
                  onTouchStart={(e) => handleNodeTouchStart(e, node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{
                    transform: `translate(${node.x}px, ${node.y}px)`,
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`
                  }}
                  className={`absolute rounded-2xl p-3 border-2 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none transition-shadow ${
                    currentTheme.cardBg
                  } ${genderBorder} ${
                    isSelected ? "ring-2 ring-indigo-400/80 border-indigo-400" : ""
                  } ${
                    isSearching && !matchedSearch ? "opacity-35" : "opacity-100"
                  } ${
                    isHovered ? "shadow-2xl shadow-indigo-500/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Member Avatar Profile */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border border-white/5 ${avatarColor}`}>
                      {node.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-semibold truncate leading-tight">
                        {node.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                        {node.occupation || "Relative"}
                      </p>
                      <p className="text-[9px] text-slate-500 mt-0.5">
                        {node.birthDate.split("-")[0]} - {node.deathDate ? node.deathDate.split("-")[0] : "Present"}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar (Overlay on Card Hover) */}
                  <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 pt-1.5 mt-1 select-none">
                    <button
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id);
                        setIsEditMode(false);
                      }}
                      className="hover:text-white transition-colors flex items-center gap-0.5"
                    >
                      <Info className="w-3 h-3 text-slate-500" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2.5">
                      {/* Plus menu toggle triggers */}
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          openAddModal(node.id, "child");
                        }}
                        className="hover:text-indigo-400 transition-colors flex items-center gap-0.5"
                        title="Add Child"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>Child</span>
                      </button>
                      
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          openAddModal(node.id, "spouse");
                        }}
                        className="hover:text-rose-400 transition-colors flex items-center gap-0.5"
                        title="Add Spouse"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Spouse</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side Inspector Panel (Selected Node Profile Viewer) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`fixed right-0 top-20 bottom-0 w-full sm:w-[420px] ${
              activeTheme === "heritage" ? "bg-[#fffdfb] border-l border-amber-900/10 text-amber-950" : "bg-slate-950/95 border-l border-slate-900 text-white"
            } backdrop-blur-xl z-30 shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                <span>Profile Details</span>
              </h3>
              <button 
                onClick={() => setSelectedNodeId(null)}
                className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {!isEditMode ? (
                // View Mode
                <>
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl border border-white/10 ${
                      selectedNode.gender === "male" 
                        ? "bg-cyan-900/30 text-cyan-400 border-cyan-500/20" 
                        : selectedNode.gender === "female"
                          ? "bg-pink-900/30 text-pink-400 border-pink-500/20"
                          : "bg-purple-900/30 text-purple-400 border-purple-500/20"
                    }`}>
                      {selectedNode.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">{selectedNode.name}</h2>
                      <p className="text-xs text-[#C5FF41] font-medium font-mono uppercase tracking-wider bg-[#C5FF41]/10 inline-block px-2.5 py-0.5 rounded-full">
                        {selectedNode.gender}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 mr-2">Life dates:</span>
                        <span className="font-semibold">
                          {selectedNode.birthDate} {selectedNode.deathDate ? `to ${selectedNode.deathDate}` : "(Living)"}
                        </span>
                      </div>
                    </div>

                    {selectedNode.birthPlace && (
                      <div className="flex items-center gap-3 text-xs sm:text-sm">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <span className="text-slate-400 mr-2">Born in:</span>
                          <span className="font-semibold">{selectedNode.birthPlace}</span>
                        </div>
                      </div>
                    )}

                    {selectedNode.occupation && (
                      <div className="flex items-center gap-3 text-xs sm:text-sm">
                        <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <span className="text-slate-400 mr-2">Occupation:</span>
                          <span className="font-semibold">{selectedNode.occupation}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedNode.bio && (
                    <div className="pt-2">
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Biography</h4>
                      <p className={`text-sm leading-relaxed p-4 rounded-xl ${
                        activeTheme === "heritage" ? "bg-stone-50 border border-stone-200/50" : "bg-slate-900/40 border border-slate-800/40"
                      }`}>
                        {selectedNode.bio}
                      </p>
                    </div>
                  )}

                  {/* Immediate Relatives Badges */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Family Network</h4>
                    
                    <div className="space-y-2">
                      {/* Spouse */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 text-xs">Spouse:</span>
                        {relatedMembers.spouse ? (
                          <button 
                            onClick={() => setSelectedNodeId(relatedMembers.spouse!.id)}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 text-xs"
                          >
                            <span>{relatedMembers.spouse.name}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-slate-500 text-xs italic">Not added</span>
                        )}
                      </div>

                      {/* Father */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 text-xs">Father:</span>
                        {relatedMembers.father ? (
                          <button 
                            onClick={() => setSelectedNodeId(relatedMembers.father!.id)}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 text-xs"
                          >
                            <span>{relatedMembers.father.name}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-slate-500 text-xs italic">Not added</span>
                        )}
                      </div>

                      {/* Mother */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 text-xs">Mother:</span>
                        {relatedMembers.mother ? (
                          <button 
                            onClick={() => setSelectedNodeId(relatedMembers.mother!.id)}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 text-xs"
                          >
                            <span>{relatedMembers.mother.name}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-slate-500 text-xs italic">Not added</span>
                        )}
                      </div>

                      {/* Children */}
                      <div className="flex flex-col gap-1.5 pt-1">
                        <span className="text-slate-400 text-xs">Children:</span>
                        {relatedMembers.children.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {relatedMembers.children.map(child => (
                              <button
                                key={child.id}
                                onClick={() => setSelectedNodeId(child.id)}
                                className={`px-2.5 py-1 text-xs font-medium rounded-lg hover:border-indigo-400 border transition-all flex items-center gap-1 ${
                                  activeTheme === "heritage" 
                                    ? "bg-amber-50 border-amber-900/10 text-amber-900" 
                                    : "bg-slate-900 border-slate-800 text-slate-200"
                                }`}
                              >
                                <span>{child.name}</span>
                                <ChevronRight className="w-2.5 h-2.5" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-500 text-xs italic mt-0.5">No children added</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-6 border-t border-white/5 flex gap-3">
                    <button
                      onClick={enterEditMode}
                      className={`flex-grow py-2.5 text-xs font-semibold rounded-xl transition-colors ${currentTheme.buttonBg}`}
                    >
                      Edit Info
                    </button>
                    <button
                      onClick={() => deleteMember(selectedNode.id)}
                      className="px-4 py-2.5 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400 rounded-xl transition-colors text-xs font-semibold"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                // Edit Mode Form
                <form onSubmit={handleEditMemberSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Gender</label>
                      <select
                        value={formGender}
                        onChange={(e) => setFormGender(e.target.value as "male" | "female" | "other")}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Occupation</label>
                      <input
                        type="text"
                        value={formOccupation}
                        onChange={(e) => setFormOccupation(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="e.g. Doctor"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Birth Date</label>
                      <input
                        type="date"
                        required
                        value={formBirthDate}
                        onChange={(e) => setFormBirthDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Death Date (Optional)</label>
                      <input
                        type="date"
                        value={formDeathDate}
                        onChange={(e) => setFormDeathDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Birth Place</label>
                    <input
                      type="text"
                      value={formBirthPlace}
                      onChange={(e) => setFormBirthPlace(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="e.g. City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Short Biography</label>
                    <textarea
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      rows={4}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Share a brief history or fun facts..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className={`flex-grow py-2.5 text-xs font-semibold rounded-xl ${currentTheme.buttonBg}`}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditMode(false)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Relative Overlay Modal Form */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-indigo-400" />
                  <span>
                    Add {addRelationType.charAt(0).toUpperCase() + addRelationType.slice(1)} Relation
                  </span>
                </h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submitAddRelation} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Gender</label>
                    <select
                      value={formGender}
                      onChange={(e) => setFormGender(e.target.value as "male" | "female" | "other")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Occupation</label>
                    <input
                      type="text"
                      value={formOccupation}
                      onChange={(e) => setFormOccupation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="e.g. Engineer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={formBirthDate}
                      onChange={(e) => setFormBirthDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Death Date (Optional)</label>
                    <input
                      type="date"
                      value={formDeathDate}
                      onChange={(e) => setFormDeathDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Birth Place</label>
                  <input
                    type="text"
                    value={formBirthPlace}
                    onChange={(e) => setFormBirthPlace(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Berlin, Germany"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Biography (Optional)</label>
                  <textarea
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Brief description of this relative..."
                  />
                </div>

                <div className="flex gap-3 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold transition-colors animate-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/35"
                  >
                    Create Relative
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
