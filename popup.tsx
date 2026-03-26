import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import defaultSchools from "./schools.json"

function IndexPopup() {
  const [isFilterActive, setIsFilterActive] = useStorage("isFilterActive", true)
  const [customSchools, setCustomSchools] = useStorage<string[]>(
    "customSchools",
    []
  )

  const [filterBusiness, setFilterBusiness] = useStorage("filterBusiness", true)
  const [filterTech, setFilterTech] = useStorage("filterTech", true)
  const [filterOthers, setFilterOthers] = useStorage("filterOthers", true)

  const [inactiveDefaults, setInactiveDefaults] = useStorage<string[]>(
    "inactiveDefaults",
    []
  )

  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({})

  const [newSchoolName, setNewSchoolName] = useState("")

  const handleAddCustomSchool = () => {
    const trimmedName = newSchoolName.trim()
    if (trimmedName && !customSchools.includes(trimmedName)) {
      setCustomSchools([...customSchools, trimmedName])
      setNewSchoolName("")
    }
  }

  const handleRemoveCustomSchool = (schoolToRemove: string) => {
    setCustomSchools(
      customSchools.filter((school) => school !== schoolToRemove)
    )
  }

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  const handleToggleDefaultSchool = (school: string) => {
    if (inactiveDefaults.includes(school)) {
      setInactiveDefaults(inactiveDefaults.filter((s) => s !== school))
    } else {
      setInactiveDefaults([...inactiveDefaults, school])
    }
  }

  const categoriesConfig = [
    {
      id: "business_schools",
      label: "Écoles de commerce",
      isActive: filterBusiness,
      toggleActive: setFilterBusiness
    },
    {
      id: "tech_schools",
      label: "Écoles Tech / Info",
      isActive: filterTech,
      toggleActive: setFilterTech
    },
    {
      id: "others",
      label: "Autres écoles",
      isActive: filterOthers,
      toggleActive: setFilterOthers
    }
  ]

  return (
    <div
      style={{
        padding: 16,
        width: 340,
        fontFamily: "sans-serif",
        color: "#333",
        maxHeight: "550px",
        overflowY: "auto"
      }}>
      <h2 style={{ marginTop: 0, marginBottom: 16 }}>Job Filter 🛡️</h2>

      {/* Bouton Global */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: 16,
          fontWeight: "bold"
        }}>
        <input
          type="checkbox"
          checked={isFilterActive}
          onChange={(e) => setIsFilterActive(e.target.checked)}
          style={{ width: 16, height: 16, cursor: "pointer" }}
        />
        <span style={{ marginLeft: 8 }}>Activer le filtrage global</span>
      </label>

      <hr style={{ border: "0.5px solid #eee", marginBottom: 16 }} />

      {/* Catégories par défaut */}
      <h3 style={{ fontSize: 14, marginTop: 0, color: "#555" }}>
        Catégories par défaut
      </h3>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
        {categoriesConfig.map((cat) => (
          <div key={cat.id} style={{ marginBottom: 8 }}>
            {/* Ligne principale de la catégorie */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 0"
              }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}>
                <input
                  type="checkbox"
                  checked={cat.isActive}
                  onChange={(e) => cat.toggleActive(e.target.checked)}
                />
                <span style={{ marginLeft: 8, fontSize: 14 }}>{cat.label}</span>
              </label>

              <button
                onClick={() => toggleCategoryExpand(cat.id)}
                style={{
                  border: "none",
                  background: "#f0f0f0",
                  cursor: "pointer",
                  fontSize: 12,
                  padding: "4px 8px",
                  borderRadius: 4
                }}>
                {expandedCats[cat.id] ? "▲" : "▼"}
              </button>
            </div>

            {/* Sous-liste des écoles (Affichée seulement si la catégorie est déroulée) */}
            {expandedCats[cat.id] && (
              <ul
                style={{
                  paddingLeft: 24,
                  margin: "4px 0 8px 0",
                  listStyle: "none"
                }}>
                {defaultSchools.categories[
                  cat.id as keyof typeof defaultSchools.categories
                ].map((school) => (
                  <li key={school} style={{ marginBottom: 4 }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: cat.isActive ? "pointer" : "not-allowed",
                        opacity: cat.isActive ? 1 : 0.5 // On grise la ligne si la catégorie mère est décochée
                      }}>
                      <input
                        type="checkbox"
                        checked={!inactiveDefaults.includes(school)}
                        onChange={() => handleToggleDefaultSchool(school)}
                        disabled={!cat.isActive} // On bloque la case si la catégorie mère est décochée
                      />
                      <span style={{ marginLeft: 6, fontSize: 13 }}>
                        {school}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <hr style={{ border: "0.5px solid #eee", marginBottom: 16 }} />

      {/* Ajout manuel */}
      <h3 style={{ fontSize: 14, marginTop: 0, color: "#555" }}>
        Ajouter une école
      </h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={newSchoolName}
          onChange={(e) => setNewSchoolName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCustomSchool()}
          placeholder="Ex: Studi"
          style={{
            flexGrow: 1,
            padding: "6px 8px",
            borderRadius: 4,
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={handleAddCustomSchool}
          style={{
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 4,
            border: "none",
            background: "#007bff",
            color: "white",
            fontWeight: "bold"
          }}>
          Ajouter
        </button>
      </div>

      {/* Liste personnalisée */}
      {customSchools.length > 0 && (
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
          {customSchools.map((school) => (
            <li
              key={school}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                borderBottom: "1px solid #f0f0f0"
              }}>
              <span style={{ fontSize: 14 }}>{school}</span>
              <button
                onClick={() => handleRemoveCustomSchool(school)}
                style={{
                  cursor: "pointer",
                  color: "#dc3545",
                  border: "none",
                  background: "none"
                }}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default IndexPopup
