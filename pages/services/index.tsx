import React, { useMemo, useState } from 'react';
import ServiceList from './ServiceList';
import ServiceDetail from './ServiceDetail';
import ServiceUpdate from './ServiceUpdate';
import { Service } from './types';
import { mockServices } from './data';
import { PlusIcon } from '../../icons/Icons';

const ServicesApp: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const activeService = useMemo(() => services.find(s => s.id === activeServiceId) || null, [services, activeServiceId]);

  const handleSave = (updated: Service) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    setShowUpdate(false);
  };

  const handleCreateService = () => {
    // For now, just show an alert. In a real app, this would open a create service modal
    alert('Create Service functionality would be implemented here');
  };

  const handleUpdateService = (serviceId: string) => {
    setActiveServiceId(serviceId);
    setShowUpdate(true);
  };

  return (
    <div className="space-y-6">
      <ServiceList 
        onOpenService={(id) => setActiveServiceId(id)} 
        onCreateService={handleCreateService}
        onUpdateService={handleUpdateService}
      />
      
      {activeService && (
        <ServiceDetail 
          service={activeService} 
          onClose={() => setActiveServiceId(null)} 
          onUpdate={handleUpdateService}
        />
      )}
      
      {activeService && showUpdate && (
        <ServiceUpdate 
          service={activeService} 
          onSave={handleSave} 
          onCancel={() => setShowUpdate(false)} 
        />
      )}
    </div>
  );
};

export default ServicesApp;
