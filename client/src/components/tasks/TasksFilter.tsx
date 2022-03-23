import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

export enum FilterType {
  All,
  NotComplete,
  Complete,
}

export enum Sort {
  PriorityAsc,
  PriorityDesc,
  SubjectAsc,
  SubjectDesc,
}

export interface IFilterSettings {
  filter: FilterType;
  sort: Sort;
}

interface IFilterSettingsProps extends IFilterSettings {
  changeSettings: (fs: IFilterSettings) => void;
}
const TasksFilter = ({
  filter,
  sort,
  changeSettings,
}: IFilterSettingsProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const s = event.target.value as unknown as Sort;
    changeSettings({ filter: filter, sort: s });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = parseInt(
      (event.target as HTMLInputElement).value as unknown as string
    ) as FilterType;
    changeSettings({ sort: sort, filter: f });
  };

  return (
    <>
      <Stack direction="column" spacing={{ xs: 2, md: 3 }} marginBottom={5}>
        <Card sx={{ minWidth: 200, maxWidth: 800 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            m={2}
          >
            <FormControl component="fieldset">
              <FormLabel>Filter</FormLabel>
              <RadioGroup
                value={filter}
                onChange={handleFilterChange}
                row
                aria-label="filter"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={FilterType.All}
                  control={<Radio />}
                  label="All"
                />
                <FormControlLabel
                  value={FilterType.Complete}
                  control={<Radio />}
                  label="Complete"
                />
                <FormControlLabel
                  value={FilterType.NotComplete}
                  control={<Radio />}
                  label="Not Complete"
                />
                <Button>More Filters</Button>
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Sort By</FormLabel>
              <Select
                size="small"
                labelId="sort-select-label"
                id="sort-select"
                value={sort.toString()}
                onChange={handleChange}
              >
                <MenuItem value={Sort.PriorityAsc}>
                  Priority High - Low
                </MenuItem>
                <MenuItem value={Sort.PriorityDesc}>
                  Priority Low - High
                </MenuItem>
                <MenuItem value={Sort.SubjectAsc}>Subject A - Z</MenuItem>
                <MenuItem value={Sort.SubjectDesc}>Subject Z - A</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default TasksFilter;
