// The filters shown on the listings page

import Tag from "@/src/components/Tag.jsx";

function FilterSelect({ label, options, value, onChange, name, icon }) {
  return (
    <div>
      <img src={icon} alt={label} />
      <label>
        {label}
        <select value={value} onChange={onChange} name={name}>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option === "" ? "All" : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default function Filters({ filters, setFilters }) {
  const handleSelectionChange = (event, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: event.target.value,
    }));
  };

  const updateField = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  return (
    <section className="filter">
      <details className="filter-menu">
        <summary>
          <img src="/filter.svg" alt="filter" />
          <div>
            <p>Schools</p>
            <p>Sorted by {filters.sort || "Rating"}</p>
          </div>
        </summary>

        <form
          method="GET"
          onSubmit={(event) => {
            event.preventDefault();
            event.target.parentNode.removeAttribute("open");
          }}
        >
          <FilterSelect
            label="City"
            options={[
              "",
              "New York",
              "Los Angeles",
              "London",
              "Paris",
              "Tokyo",
              "Mumbai",
              "Dubai",
              "Amsterdam",
              "Seoul",
              "Singapore",
              "Istanbul",
            ]}
            value={filters.city}
            onChange={(event) => handleSelectionChange(event, "city")}
            name="city"
            icon="/location.svg"
          />

          <div>
            <img src="/location.svg" alt="District" />
            <label>
              District
              <input
                type="text"
                value={filters.district || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, district: e.target.value }))
                }
                name="district"
              />
            </label>
          </div>

          <FilterSelect
            label="Tuition"
            options={["", "$", "$$", "$$$", "$$$$"]}
            value={filters.tuitionBand}
            onChange={(event) => handleSelectionChange(event, "tuitionBand")}
            name="tuitionBand"
            icon="/price.svg"
          />

          <div>
            <img src="/filter.svg" alt="Type" />
            <label>
              Public
              <select
                value={filters.isPublic === true ? "true" : filters.isPublic === false ? "false" : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilters((prev) => ({
                    ...prev,
                    isPublic: val === "" ? "" : val,
                  }));
                }}
                name="isPublic"
              >
                <option value="">All</option>
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </label>
          </div>

          <div>
            <img src="/filter.svg" alt="Grades" />
            <label>
              Grades
              <select
                multiple
                value={filters.grades || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                  setFilters((prev) => ({ ...prev, grades: selected }));
                }}
                name="grades"
              >
                <option value="K-5">K-5</option>
                <option value="6-8">6-8</option>
                <option value="9-12">9-12</option>
              </select>
            </label>
          </div>

          <FilterSelect
            label="Sort"
            options={["Rating", "Review"]}
            value={filters.sort}
            onChange={(event) => handleSelectionChange(event, "sort")}
            name="sort"
            icon="/sortBy.svg"
          />

          <footer>
            <menu>
              <button
                className="button--cancel"
                type="reset"
                onClick={() => {
                  setFilters({
                    city: "",
                    district: "",
                    isPublic: "",
                    grades: [],
                    tuitionBand: "",
                    sort: "",
                  });
                }}
              >
                Reset
              </button>
              <button type="submit" className="button--confirm">
                Submit
              </button>
            </menu>
          </footer>
        </form>
      </details>

      <div className="tags">
        {Object.entries(filters).map(([type, value]) => {
          // The main filter bar already specifies what
          // sorting is being used. So skip showing the
          // sorting as a 'tag'
          if (type == "sort" || value == "") {
            return null;
          }
          return (
            <Tag
              key={value}
              type={type}
              value={value}
              updateField={updateField}
            />
          );
        })}
      </div>
    </section>
  );
}
